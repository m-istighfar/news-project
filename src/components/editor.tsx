"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "./ui/button";
import { Bold, Italic, List, ListOrdered, Quote, Redo, Strikethrough, Undo } from "lucide-react";
import { useEffect } from "react";

interface EditorProps {
  name: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function Editor({ name, defaultValue, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: defaultValue,
    editorProps: {
      attributes: {
        class: "prose prose-sm min-h-[200px] px-4 py-3 focus:outline-none",
        placeholder: "Tulis konten berita Anda di sini...",
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      // Call onChange if provided
      if (onChange) {
        onChange(content);
      }
      // Create hidden input
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = content;

      // Remove existing input
      const existingInput = document.querySelector(`input[name="${name}"]`);
      if (existingInput) {
        existingInput.remove();
      }

      // Add to form
      const form = editor.view.dom.closest("form");
      if (form) {
        form.appendChild(input);
      }
    },
  });

  // Force update content when defaultValue changes
  useEffect(() => {
    if (editor && defaultValue) {
      editor.commands.setContent(defaultValue);
    }
  }, [editor, defaultValue]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md bg-white ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <div className="border-b bg-muted/50 p-2 flex flex-wrap gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          data-active={editor.isActive("bold")}
          className="data-[active=true]:bg-muted"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          data-active={editor.isActive("italic")}
          className="data-[active=true]:bg-muted"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          data-active={editor.isActive("strike")}
          className="data-[active=true]:bg-muted"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          data-active={editor.isActive("bulletList")}
          className="data-[active=true]:bg-muted"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          data-active={editor.isActive("orderedList")}
          className="data-[active=true]:bg-muted"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          data-active={editor.isActive("blockquote")}
          className="data-[active=true]:bg-muted"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      <div className="relative">
        <EditorContent
          editor={editor}
          className="[&_p.is-editor-empty:first-of-type]:before:content-[attr(data-placeholder)] [&_p.is-editor-empty:first-of-type]:before:text-muted-foreground [&_p.is-editor-empty:first-of-type]:before:float-left [&_p.is-editor-empty:first-of-type]:before:pointer-events-none"
        />
        {!editor.isFocused && (
          <div className="absolute inset-0 bg-muted/5 pointer-events-none border-2 border-dashed border-muted-foreground/20" />
        )}
      </div>
    </div>
  );
}
