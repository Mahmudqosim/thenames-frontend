"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/hooks/use-toast"
import { Input } from "@progress/kendo-react-inputs"
import { DropDownList } from "@progress/kendo-react-dropdowns"
import { Button } from "@progress/kendo-react-buttons"
// import { Form, FormElement } from "@progress/kendo-react-form"
import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout"
import {
  SiteFormSchema,
  SiteFormValues,
  Site,
  SiteContent,
} from "@/lib/schemas"

export default function SiteBuilder() {
  const { siteId } = useParams<{ siteId: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null)

  // Set up react-hook-form with zod validation
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<SiteFormValues>({
    resolver: zodResolver(SiteFormSchema),
    defaultValues: {
      title: "",
      description: "",
      style: "minimal",
      links: [{ title: "", url: "", description: "" }],
      content: null,
    },
  })

  // Set up field array for links
  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  })

  // Fetch existing site data if editing
  useEffect(() => {
    async function fetchSite() {
      if (!siteId || siteId === "new") return

      try {
        setLoading(true)
        const response = await fetch(`/api/sites/${siteId}`)
        if (!response.ok) throw new Error("Failed to fetch site")

        const data = (await response.json()) as Site
        reset(data)
        if (data.content) {
          setSiteContent(data.content)
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error loading site",
          variant: "destructive",
        })
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchSite()
  }, [siteId, reset])

  // Generate site with Gemini
  const generateSite = async (data: SiteFormValues) => {
    try {
      setGenerating(true)
      const response = await fetch("/api/generate-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to generate site")

      const result = await response.json()
      setSiteContent(result.content)
      reset({
        ...data,
        content: result.content,
      })
      toast({
        title: "Success",
        description: "Site generated successfully!",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate site",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setGenerating(false)
    }
  }

  // Save site
  const saveSite = async (data: SiteFormValues) => {
    try {
      setLoading(true)
      const method = siteId && siteId !== "new" ? "PUT" : "POST"
      const url =
        siteId && siteId !== "new" ? `/api/sites/${siteId}` : "/api/sites"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          content: siteContent,
        }),
      })

      if (!response.ok) throw new Error("Failed to save site")

      const result = await response.json()
      toast({
        title: "Success",
        description: "Site saved successfully!",
        variant: "default",
      })

      if (siteId === "new") {
        router.push(`/dashboard/site-builder/${result.id}`)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save site",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Publish site
  const publishSite = async () => {
    if (!siteId || siteId === "new") return

    try {
      setLoading(true)
      const response = await fetch(`/api/sites/${siteId}/publish`, {
        method: "POST",
      })

      if (!response.ok) throw new Error("Failed to publish site")

      const data = await response.json()

      toast({
        title: "Success",
        description: "Site published successfully!",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish site",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const styleOptions = [
    { text: "Minimal", value: "minimal" },
    { text: "Colorful", value: "colorful" },
    { text: "Professional", value: "professional" },
    { text: "Creative", value: "creative" },
    { text: "Dark Mode", value: "dark" },
  ]

  if (loading && fields.length === 1 && !fields[0].title) {
    return <div className="p-8 text-center">Loading...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {siteId && siteId !== "new" ? "Edit Site" : "Create New Site"}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Site Builder Form */}
        <Card>
          <CardHeader className="bg-gray-50 border-b">
            <h2 className="text-lg font-medium">Site Details</h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(saveSite)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Site Title <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="w-full"
                      placeholder="My Portfolio"
                    />
                  )}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* ...other form fields remain the same... */}

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  themeColor="info"
                  disabled={generating || !isDirty}
                  onClick={handleSubmit(generateSite)}
                >
                  {generating ? "Generating..." : "Generate with Gemini"}
                </Button>

                <Button
                  type="submit"
                  themeColor="primary"
                  disabled={loading || !isDirty}
                >
                  {loading ? "Saving..." : "Save Site"}
                </Button>

                {siteId && siteId !== "new" && (
                  <Button
                    type="button"
                    themeColor="success"
                    onClick={publishSite}
                    disabled={loading || !siteContent}
                  >
                    {loading ? "Publishing..." : "Publish Site"}
                  </Button>
                )}
              </div>
            </form>
          </CardBody>
        </Card>

        {/* Preview Panel */}
        <Card>
          <CardHeader className="bg-gray-50 border-b">
            <h2 className="text-lg font-medium">Preview</h2>
          </CardHeader>
          <CardBody className="p-0 h-96">
            {siteContent ? (
              <iframe
                srcDoc={`
                  <html>
                    <head>
                      <style>${siteContent.css}</style>
                    </head>
                    <body>
                      ${siteContent.html}
                      <script>${siteContent.js}</script>
                    </body>
                  </html>
                `}
                className="w-full h-full border-none"
                title="Site Preview"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 p-4">
                {generating
                  ? "Generating preview..."
                  : "Generate your site to see the preview"}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
