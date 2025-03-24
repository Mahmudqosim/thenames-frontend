"use client";

import { useState } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { Stepper } from "@progress/kendo-react-layout";
import { PortfolioContent } from "@/services/ai";
import PortfolioGenerationForm from "./PortfolioGenerationForm";

interface AiGenerationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyContent: (content: PortfolioContent) => void;
}

const AiGenerationDialog = ({
  isOpen,
  onClose,
  onApplyContent,
}: AiGenerationDialogProps) => {
  const [generatedContent, setGeneratedContent] = useState<PortfolioContent | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    { label: "Enter Information", isValid: true },
    { label: "Review Generated Content", isValid: !!generatedContent },
  ];

  const handleGeneration = (content: PortfolioContent) => {
    setGeneratedContent(content);
    setStepIndex(1);
  };

  const handleApply = () => {
    if (!generatedContent) return;
    onApplyContent(generatedContent);
    onClose();
    setStepIndex(0);
    setGeneratedContent(null);
  };

  const handleBack = () => {
    setStepIndex(0);
  };

  const handleClose = () => {
    onClose();
    // Reset state after dialog closes with delay to avoid visual glitches
    setTimeout(() => {
      setStepIndex(0);
      setGeneratedContent(null);
    }, 300);
  };

  return (
    <>
      {isOpen && (
        <Dialog
          title="AI Website Generator"
          onClose={handleClose}
          width={900}
          height={650}
        >
          <div className="px-4 pt-4">
            <Stepper value={stepIndex} items={steps} onChange={(e) => setStepIndex(e.value)} />
          </div>
          
          <div className="h-[calc(100%-120px)] overflow-auto p-4">
            {stepIndex === 0 ? (
              <PortfolioGenerationForm onGeneration={handleGeneration} />
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Review Generated Content</h2>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">Hero Section</h3>
                    <button 
                      className="text-blue-600 text-sm hover:underline"
                      onClick={() => {
                        // Show preview for this section only
                        const preview = window.open();
                        if (preview && generatedContent) {
                          preview.document.write(`
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                              <meta charset="UTF-8">
                              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                              <title>Hero Section Preview</title>
                              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                            </head>
                            <body>
                              ${generatedContent.hero}
                            </body>
                            </html>
                          `);
                          preview.document.close();
                        }
                      }}
                    >
                      Quick Preview
                    </button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded overflow-auto max-h-40">
                    <pre className="text-sm whitespace-pre-wrap">{generatedContent?.hero}</pre>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">About Section</h3>
                    <button 
                      className="text-blue-600 text-sm hover:underline"
                      onClick={() => {
                        // Show preview for this section only
                        const preview = window.open();
                        if (preview && generatedContent) {
                          preview.document.write(`
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                              <meta charset="UTF-8">
                              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                              <title>About Section Preview</title>
                              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                            </head>
                            <body>
                              ${generatedContent.about}
                            </body>
                            </html>
                          `);
                          preview.document.close();
                        }
                      }}
                    >
                      Quick Preview
                    </button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded overflow-auto max-h-40">
                    <pre className="text-sm whitespace-pre-wrap">{generatedContent?.about}</pre>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">Skills Section</h3>
                    <button 
                      className="text-blue-600 text-sm hover:underline"
                      onClick={() => {
                        // Show preview for this section only
                        const preview = window.open();
                        if (preview && generatedContent) {
                          preview.document.write(`
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                              <meta charset="UTF-8">
                              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                              <title>Skills Section Preview</title>
                              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                            </head>
                            <body>
                              ${generatedContent.skills}
                            </body>
                            </html>
                          `);
                          preview.document.close();
                        }
                      }}
                    >
                      Quick Preview
                    </button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded overflow-auto max-h-40">
                    <pre className="text-sm whitespace-pre-wrap">{generatedContent?.skills}</pre>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">Projects Section</h3>
                    <button 
                      className="text-blue-600 text-sm hover:underline"
                      onClick={() => {
                        // Show preview for this section only
                        const preview = window.open();
                        if (preview && generatedContent) {
                          preview.document.write(`
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                              <meta charset="UTF-8">
                              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                              <title>Projects Section Preview</title>
                              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                            </head>
                            <body>
                              ${generatedContent.projects}
                            </body>
                            </html>
                          `);
                          preview.document.close();
                        }
                      }}
                    >
                      Quick Preview
                    </button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded overflow-auto max-h-40">
                    <pre className="text-sm whitespace-pre-wrap">{generatedContent?.projects}</pre>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">Contact Section</h3>
                    <button 
                      className="text-blue-600 text-sm hover:underline"
                      onClick={() => {
                        // Show preview for this section only
                        const preview = window.open();
                        if (preview && generatedContent) {
                          preview.document.write(`
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                              <meta charset="UTF-8">
                              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                              <title>Contact Section Preview</title>
                              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                            </head>
                            <body>
                              ${generatedContent.contact}
                            </body>
                            </html>
                          `);
                          preview.document.close();
                        }
                      }}
                    >
                      Quick Preview
                    </button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded overflow-auto max-h-40">
                    <pre className="text-sm whitespace-pre-wrap">{generatedContent?.contact}</pre>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    // Show full preview
                    const preview = window.open();
                    if (preview && generatedContent) {
                      preview.document.write(`
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>Full Website Preview</title>
                          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                        </head>
                        <body>
                          ${Object.values(generatedContent).join('')}
                        </body>
                        </html>
                      `);
                      preview.document.close();
                    }
                  }}
                  themeColor="info"
                  className="w-full"
                >
                  Preview Full Website
                </Button>
              </div>
            )}
          </div>
          
          <DialogActionsBar>
            {stepIndex === 0 ? (
              <Button onClick={handleClose}>Cancel</Button>
            ) : (
              <>
                <Button onClick={handleBack}>Back</Button>
                <Button themeColor="primary" onClick={handleApply}>
                  Apply to Editor
                </Button>
              </>
            )}
          </DialogActionsBar>
        </Dialog>
      )}
    </>
  );
};

export default AiGenerationDialog;