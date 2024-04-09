"use client";
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTapMenuBar from "./TipTapMenuBar";
import { Button } from "@/components/ui/button";
import { useDebounce } from "./useDebounce";
// import { useMutation } from "@tanstack/react-query";
import Text from "@tiptap/extension-text";
import axios from "axios";
import { useCompletion } from "ai/react";


type Props = {};

const TipTapEditor = (props: Props) => {
  const [editorState, setEditorState] = React.useState('');
  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });
  
  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": () => {
          // take the last 30 words
          const prompt = this.editor.getText().split(" ").slice(-30).join(" ");
          complete(prompt);
          return true;
        },
      };
    },
});

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });
  const lastCompletion = React.useRef("");

  React.useEffect(() => {
    if (!completion || !editor) return;
    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;
    editor.commands.insertContent(diff);
  }, [completion, editor]);

  return (
    <>
      <div className="flex">
        {editor && <TipTapMenuBar editor={editor} />}
          <Button style={{ backgroundColor: 'gold', color: 'black' }}>
            {"Saved"}
          </Button>
      </div>

      <div className="prose prose-sm w-full mt-4">
        <EditorContent editor={editor} />
      </div>
      <div className="h-4"></div>

    </>
  );
};

export default TipTapEditor;
