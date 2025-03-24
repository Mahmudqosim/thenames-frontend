"use client"

import { useEffect, useState } from "react"

interface TailwindBlocksProps {
  editor: any
}

const TailwindBlocks = ({ editor }: TailwindBlocksProps) => {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // Only run once per editor instance
    if (!editor || initialized) return

    // Wait for the editor to be fully initialized
    const checkBlockManager = () => {
      try {
        if (editor && editor.BlockManager) {
          // Add portfolio blocks
          addPortfolioBlocks()
          setInitialized(true)
        } else {
          // Try again in 500ms
          setTimeout(checkBlockManager, 500)
        }
      } catch (err) {
        console.error("Error checking BlockManager:", err)
        setTimeout(checkBlockManager, 1000)
      }
    }

    const addPortfolioBlocks = () => {
      // Portfolio-specific blocks
      editor.BlockManager.add("hero-section", {
        label: "Hero Section",
        category: "Portfolio",
        content: `
        <section class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
          <div class="container mx-auto px-4 text-center">
            <h1 class="text-5xl font-bold mb-4">Your Name</h1>
            <p class="text-xl mb-8">Professional Title or Tagline</p>
            <button class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">Get In Touch</button>
          </div>
        </section>
      `,
        attributes: { class: "fa fa-heading" },
      })

      editor.BlockManager.add("about-me", {
        label: "About Me",
        category: "Portfolio",
        content: `
        <section class="py-16 bg-gray-50">
          <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold mb-8 text-center">About Me</h2>
            <div class="flex flex-col md:flex-row items-center">
              <div class="md:w-1/3 mb-8 md:mb-0">
                <img src="https://via.placeholder.com/300" alt="Profile Photo" class="rounded-full w-64 h-64 object-cover mx-auto shadow-lg" />
              </div>
              <div class="md:w-2/3 md:pl-12">
                <p class="text-lg mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
                <p class="text-lg">Nullam lobortis justo et ultricies commodo. In hac habitasse platea dictumst. Praesent ornare finibus dui a commodo.</p>
              </div>
            </div>
          </div>
        </section>
      `,
        attributes: { class: "fa fa-user" },
      })

      editor.BlockManager.add("skills-section", {
        label: "Skills",
        category: "Portfolio",
        content: `
        <section class="py-16 bg-white">
          <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold mb-12 text-center">Skills</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div class="text-blue-600 text-4xl mb-4">★</div>
                <h3 class="font-semibold text-lg mb-2">Skill 1</h3>
                <p class="text-gray-600">Description of your skill</p>
              </div>
              <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div class="text-blue-600 text-4xl mb-4">★</div>
                <h3 class="font-semibold text-lg mb-2">Skill 2</h3>
                <p class="text-gray-600">Description of your skill</p>
              </div>
              <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div class="text-blue-600 text-4xl mb-4">★</div>
                <h3 class="font-semibold text-lg mb-2">Skill 3</h3>
                <p class="text-gray-600">Description of your skill</p>
              </div>
              <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div class="text-blue-600 text-4xl mb-4">★</div>
                <h3 class="font-semibold text-lg mb-2">Skill 4</h3>
                <p class="text-gray-600">Description of your skill</p>
              </div>
            </div>
          </div>
        </section>
      `,
        attributes: { class: "fa fa-code" },
      })

      editor.BlockManager.add("projects-section", {
        label: "Projects",
        category: "Portfolio",
        content: `
        <section class="py-16 bg-gray-50">
          <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold mb-12 text-center">Projects</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="bg-white rounded-lg overflow-hidden shadow-md">
                <img src="https://via.placeholder.com/600x400" alt="Project 1" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <h3 class="font-bold text-xl mb-2">Project Name</h3>
                  <p class="text-gray-700 mb-4">Description of your amazing project and what technologies you used.</p>
                  <div class="flex space-x-2">
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">React</span>
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Node.js</span>
                  </div>
                </div>
              </div>
              <div class="bg-white rounded-lg overflow-hidden shadow-md">
                <img src="https://via.placeholder.com/600x400" alt="Project 2" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <h3 class="font-bold text-xl mb-2">Project Name</h3>
                  <p class="text-gray-700 mb-4">Description of your amazing project and what technologies you used.</p>
                  <div class="flex space-x-2">
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">React</span>
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Node.js</span>
                  </div>
                </div>
              </div>
              <div class="bg-white rounded-lg overflow-hidden shadow-md">
                <img src="https://via.placeholder.com/600x400" alt="Project 3" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <h3 class="font-bold text-xl mb-2">Project Name</h3>
                  <p class="text-gray-700 mb-4">Description of your amazing project and what technologies you used.</p>
                  <div class="flex space-x-2">
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">React</span>
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Node.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `,
        attributes: { class: "fa fa-briefcase" },
      })

      editor.BlockManager.add("contact-section", {
        label: "Contact",
        category: "Portfolio",
        content: `
        <section class="py-16 bg-white">
          <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold mb-12 text-center">Get In Touch</h2>
            <div class="max-w-2xl mx-auto">
              <form>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" id="name" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Your name" />
                  </div>
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="your@email.com" />
                  </div>
                </div>
                <div class="mb-6">
                  <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="message" rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Your message"></textarea>
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition">Send Message</button>
              </form>
            </div>
          </div>
        </section>
      `,
        attributes: { class: "fa fa-envelope" },
      })

      editor.BlockManager.add("footer-section", {
        label: "Footer",
        category: "Portfolio",
        content: `
        <footer class="bg-gray-800 text-white py-8">
          <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row justify-between items-center">
              <div class="mb-4 md:mb-0">
                <h3 class="text-xl font-semibold">Your Name</h3>
                <p class="mt-2 text-gray-400">© 2025 All Rights Reserved</p>
              </div>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      `,
        attributes: { class: "fa fa-th-large" },
      })
    }

    checkBlockManager()
  }, [editor, initialized])

  return null
}

export default TailwindBlocks
