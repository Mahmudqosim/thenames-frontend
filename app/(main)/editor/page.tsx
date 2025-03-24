"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@progress/kendo-react-buttons"
import { Dialog } from "@progress/kendo-react-dialogs"

// Dynamically import components to avoid SSR issues
const GrapeJSEditor = dynamic(
  () => import("@/components/Editor/GrapeJSEditor"),
  { ssr: false }
)

const TailwindBlocks = dynamic(
  () => import("@/components/Editor/TailwindBlocks"),
  { ssr: false }
)

// Import AI dialog
import AiGenerationDialog from "@/components/AI/AiGenerationDialog"
import { toast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function EditorPage() {
  const [editor, setEditor] = useState<any>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [previewContent, setPreviewContent] = useState("")
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [showAiDialog, setShowAiDialog] = useState(false)
  const [previewViewport, setPreviewViewport] = useState("desktop")

  const handleEditorReady = (editorInstance: any) => {
    console.log("Editor ready:", editorInstance)
    setEditor(editorInstance)
  }

  const handleSave = (data: any) => {
    console.log("Saving website data:", data)
    setShowSaveDialog(true)
  }

  const saveProject = () => {
    if (!projectName) {
      toast({ title: "Please enter a project name", variant: "destructive" })
      return
    }

    toast({
      title: `Project "${projectName}" saved successfully`,
      variant: "default",
    })
    setShowSaveDialog(false)
  }

  const handlePreview = () => {
    if (!editor) {
      console.error("Editor not ready")
      return
    }

    try {
      const html = editor.getHtml()
      const css = editor.getCss()

      const previewContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Website Preview</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>${css}</style>
        </head>
        <body>
          ${html}
        </body>
        </html>
      `

      setPreviewContent(previewContent)
      setShowPreview(true)
    } catch (err) {
      console.error("Error generating preview:", err)
      toast({
        title: "Error generating preview",
        variant: "destructive",
      })
    }
  }

  const handleApplyAiContent = (content: {
    hero: string
    about: string
    skills: string
    projects: string
    contact: string
  }) => {
    if (!editor) return

    // Clear existing content
    editor.setComponents("")

    // Add each section to the editor
    const sections = [
      content.hero,
      content.about,
      content.skills,
      content.projects,
      content.contact,
    ]

    // Combine all sections
    const fullContent = sections.join("\n")

    // Add the content to the editor
    editor.setComponents(fullContent)
  }

  const handleExport = () => {
    if (!editor) {
      console.error("Editor not ready")
      return
    }

    try {
      const html = editor.getHtml()
      const css = editor.getCss()

      const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${projectName || "Portfolio Website"}</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>${css}</style>
        </head>
        <body>
          ${html}
        </body>
        </html>
      `

      // Create a blob from the HTML
      const blob = new Blob([fullHtml], { type: "text/html" })
      const url = URL.createObjectURL(blob)

      // Create a temporary link and trigger download
      const a = document.createElement("a")
      a.href = url
      a.download = `${projectName || "portfolio"}.html`
      document.body.appendChild(a)
      a.click()

      // Clean up
      setTimeout(() => {
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, 0)
      toast({
        title: "Website exported successfully",
        variant: "default",
      })
    } catch (err) {
      console.error("Error exporting website:", err)
      toast({
        title: "Error exporting website",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Top navigation bar */}
      <div className="bg-gray-800 text-white p-3 flex justify-between items-center">

        <div className="flex space-x-2">
          <Button
            onClick={() => setShowAiDialog(true)}
            themeColor="tertiary"
            className="flex items-center"
            title="Generate content with AI" // Added title attribute instead of Tooltip
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
            AI Generate
          </Button>

          <Button
            onClick={handlePreview}
            themeColor="info"
            className="flex items-center"
            title="Preview your website"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              ></path>
            </svg>
            Preview
          </Button>

          <Button
            onClick={() => editor?.runCommand("save-template")}
            themeColor="success"
            className="flex items-center"
            title="Save your project"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              ></path>
            </svg>
            Save
          </Button>

          <Button
            onClick={handleExport}
            themeColor="warning"
            className="flex items-center"
            title="Export your website"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
            Export as HTML
          </Button>
        </div>
      </div>

      {/* Editor container */}
      <div className="flex-1 relative w-full">
        <GrapeJSEditor onSave={handleSave} onEditorReady={handleEditorReady} />
        {editor && <TailwindBlocks editor={editor} />}
      </div>

      {/* Preview Dialog */}
      {showPreview && (
        <Dialog
          title="Website Preview"
          onClose={() => setShowPreview(false)}
          width={900}
          height={700}
        >
          <div className="h-full overflow-auto border p-4 flex flex-col">
            <div className="flex space-x-2 mb-2">
              <Button
                onClick={() => {
                  const newTab = window.open()
                  if (newTab) {
                    newTab.document.write(previewContent)
                    newTab.document.close()
                  }
                }}
                themeColor="info"
              >
                Open in New Tab
              </Button>

              <div className="flex ml-auto">
                <Button
                  onClick={() => setPreviewViewport("desktop")}
                  themeColor={
                    previewViewport === "desktop" ? "primary" : "light"
                  }
                  className="rounded-r-none"
                >
                  Desktop
                </Button>
                <Button
                  onClick={() => setPreviewViewport("tablet")}
                  themeColor={
                    previewViewport === "tablet" ? "primary" : "light"
                  }
                  className="rounded-none border-l border-r"
                >
                  Tablet
                </Button>
                <Button
                  onClick={() => setPreviewViewport("mobile")}
                  themeColor={
                    previewViewport === "mobile" ? "primary" : "light"
                  }
                  className="rounded-l-none"
                >
                  Mobile
                </Button>
              </div>
            </div>

            <iframe
              srcDoc={previewContent}
              title="Preview"
              className={`border mx-auto transition-all duration-300 ${
                previewViewport === "desktop"
                  ? "w-full"
                  : previewViewport === "tablet"
                  ? "w-[768px]"
                  : "w-[375px]"
              }`}
              style={{
                height: "calc(100% - 40px)",
                maxHeight: "calc(100% - 40px)",
              }}
              sandbox="allow-same-origin"
            />
          </div>
        </Dialog>
      )}

      {/* Save Project Dialog */}
      {showSaveDialog && (
        <Dialog
          title="Save Project"
          onClose={() => setShowSaveDialog(false)}
          width={400}
        >
          <div className="p-4">
            <label className="block mb-2 text-sm font-medium">
              Project Name:
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
            />
          </div>
          <div className="flex justify-end space-x-2 p-4 border-t">
            <Button onClick={() => setShowSaveDialog(false)}>Cancel</Button>
            <Button onClick={saveProject} themeColor="primary">
              Save
            </Button>
          </div>
        </Dialog>
      )}

      {/* AI Generation Dialog */}
      <AiGenerationDialog
        isOpen={showAiDialog}
        onClose={() => setShowAiDialog(false)}
        onApplyContent={handleApplyAiContent}
      />
    </div>
  )
}
