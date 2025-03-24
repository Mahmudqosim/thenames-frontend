import React from "react"
import { Button } from "@progress/kendo-react-buttons"

const EditorControls: React.FC<{
  onSave: () => void
  onPreview: () => void
  onReset: () => void
}> = ({ onSave, onPreview, onReset }) => {
  return (
    <div className="flex space-x-4 p-4 bg-gray-100">
      <Button onClick={onSave} themeColor="primary" >
        Save
      </Button>
      <Button onClick={onPreview} themeColor="info">
        Preview
      </Button>
      <Button onClick={onReset} themeColor="warning">
        Reset
      </Button>
    </div>
  )
}

export default EditorControls
