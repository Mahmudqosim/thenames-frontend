"use client"

import React, { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

// Import styles
import "grapesjs/dist/css/grapes.min.css"

interface GrapeJSEditorProps {
  onSave?: (data: any) => void
  initialContent?: string
  onEditorReady?: (editor: any) => void
}

const GrapeJSEditor = ({
  onSave,
  initialContent,
  onEditorReady,
}: GrapeJSEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [editorInstance, setEditorInstance] = useState<any>(null)

  // Only run this effect once when the component mounts
  useEffect(() => {
    // Skip if no ref or already initialized
    if (!editorRef.current || editorInstance) return

    // Import all modules dynamically to avoid SSR issues
    const setupEditor = async () => {
      try {
        // Dynamically import all dependencies
        const grapesjs = (await import("grapesjs")).default
        const gjsPresetWebpage = (await import("grapesjs-preset-webpage"))
          .default
        const gjsBlocksBasic = (await import("grapesjs-blocks-basic")).default
        const gjsForms = (await import("grapesjs-plugin-forms")).default
        const gjsComponentCodeEditor = (
          await import("grapesjs-component-code-editor")
        ).default
        const gjsStyleBg = (await import("grapesjs-style-bg")).default
        const gjsTailwind = (await import("grapesjs-tailwind")).default

        // Initialize editor
        const editor = grapesjs.init({
          container: editorRef.current!,
          height: "100%",
          width: "100%",
          fromElement: false,
          storageManager: false, // Disable storage manager for now
          plugins: [
            gjsPresetWebpage,
            gjsBlocksBasic,
            gjsForms,
            gjsComponentCodeEditor,
            gjsStyleBg,
            gjsTailwind,
          ],
          pluginsOpts: {
            "grapesjs-preset-webpage": {
              modalImportTitle: "Import Template",
              modalImportLabel:
                '<div style="margin-bottom: 10px; font-size: 13px;">Paste your HTML/CSS here</div>',
              modalImportContent: "",
            },
            "grapesjs-blocks-basic": {},
            "grapesjs-tailwind": {
              utilities: {},
              theme: {},
              // Don't specify configPath which causes errors
            },
          },
          canvas: {
            styles: [
              "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
            ],
          },
          deviceManager: {
            devices: [
              {
                id: "desktop",
                name: "Desktop",
                width: "",
              },
              {
                id: "tablet",
                name: "Tablet",
                width: "768px",
                widthMedia: "768px",
              },
              {
                id: "mobile",
                name: "Mobile",
                width: "320px",
                widthMedia: "320px",
              },
            ],
          },
          panels: {
            defaults: [
              {
                id: "layers",
                el: ".layers-container",
                resizable: {
                  tc: false,
                  cl: true,
                  cr: false,
                  bc: false,
                },
              },
              {
                id: "panel-devices",
                el: ".panel-devices",
                buttons: [
                  {
                    id: "device-desktop",
                    label: "Desktop",
                    command: "set-device-desktop",
                    active: true,
                    togglable: false,
                  },
                  {
                    id: "device-tablet",
                    label: "Tablet",
                    command: "set-device-tablet",
                    togglable: false,
                  },
                  {
                    id: "device-mobile",
                    label: "Mobile",
                    command: "set-device-mobile",
                    togglable: false,
                  },
                ],
              },
            ],
          },
        })

        // Load initial content if provided
        if (initialContent) {
          editor.setComponents(initialContent)
        }

        // Setup save command
        if (onSave) {
          editor.Commands.add("save-template", {
            run: (editor: any) => {
              try {
                const html = editor.getHtml()
                const css = editor.getCss()

                onSave({
                  html,
                  css,
                  js: editor.getJs?.() || "",
                  components: JSON.stringify(editor.getComponents()),
                  styles: JSON.stringify(editor.getStyle()),
                })
              } catch (err) {
                console.error("Error in save command:", err)
              }
            },
          })

          // Add keyboard shortcut for saving
          editor.Keymaps.add("save", "ctrl+s", (editor: any) => {
            editor.runCommand("save-template")
          })
        }

        // Store editor instance in state
        setEditorInstance(editor)

        // Notify parent component
        if (onEditorReady) {
          onEditorReady(editor)
        }
      } catch (error) {
        console.error("Error initializing GrapeJS:", error)
      }
    }

    setupEditor()

    // Cleanup function
    return () => {
      if (editorInstance) {
        editorInstance.destroy()
      }
    }
  }, []) // Empty dependency array - run once on mount

  // This useEffect handles changes to props without re-initializing the editor
  useEffect(() => {
    if (!editorInstance) return

    // Update callbacks
    if (onSave && editorInstance.Commands) {
      editorInstance.Commands.add("save-template", {
        run: (editor: any) => {
          try {
            const html = editor.getHtml()
            const css = editor.getCss()

            onSave({
              html,
              css,
              js: editor.getJs?.() || "",
              components: JSON.stringify(editor.getComponents()),
              styles: JSON.stringify(editor.getStyle()),
            })
          } catch (err) {
            console.error("Error in save command:", err)
          }
        },
      })
    }

    // Update initial content if it changes
    if (initialContent !== undefined && editorInstance.setComponents) {
      editorInstance.setComponents(initialContent)
    }

    // Update onEditorReady callback
    if (onEditorReady) {
      onEditorReady(editorInstance)
    }
  }, [onSave, initialContent, onEditorReady, editorInstance])

  return (
    <div className="grapesjs-editor-container h-full w-full flex">
      {/* <div className="layers-container w-64 bg-gray-100 border-r"></div> */}
      <div className="flex-1 flex flex-col w-full">
        <div className="panel-devices bg-white border-b p-2 flex space-x-2"></div>
        <div ref={editorRef} className="flex-1 w-full"></div>
      </div>
      {/* <div className="styles-container w-64 bg-gray-100 border-l"></div> */}
    </div>
  )
}

// Export with dynamic to disable SSR
export default dynamic(() => Promise.resolve(GrapeJSEditor), { ssr: false })
