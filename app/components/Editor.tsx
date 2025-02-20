"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import "./Editor.css";
import { FaCodeMerge } from "react-icons/fa6";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Editor = ({ setPropsContent, defaultContent }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  console.log(defaultContent);
  useEffect(() => {
    setContent(defaultContent);
  }, [defaultContent]);

  useEffect(() => {
    setPropsContent(content);
  }, [content]);

  // Ensure that document is available
  const isClient = typeof window !== "undefined";

  const copyStringToClipboard = function (str: any) {
    if (!isClient) return; // Prevent running this on the server

    var el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const facilityMergeFields = [
    "FacilityNumber",
    "FacilityName",
    "Address",
    "MapCategory",
    "Latitude",
    "Longitude",
    "ReceivingPlant",
    "TrunkLine",
    "SiteElevation",
  ];
  const inspectionMergeFields = [
    "InspectionCompleteDate",
    "InspectionEventType",
  ];

  const createOptionGroupElement = (
    mergeFields: any,
    optionGrouplabel: any
  ) => {
    if (!isClient) return null; // Prevent running this on the server

    let optionGroupElement = document.createElement("optgroup");
    optionGroupElement.setAttribute("label", optionGrouplabel);
    for (let index = 0; index < mergeFields.length; index++) {
      let optionElement = document.createElement("option");
      optionElement.setAttribute("class", "merge-field-select-option");
      optionElement.setAttribute("value", mergeFields[index]);
      optionElement.text = mergeFields[index];
      optionGroupElement.appendChild(optionElement);
    }
    return optionGroupElement;
  };

  const buttons = [
    "undo",
    "redo",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "superscript",
    "subscript",
    "|",
    "align",
    "|",
    "ul",
    "ol",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "link",
    "table",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "|",
    "fullsize",
    "selectall",
    "print",
    "|",
    "source",
    "|",
    {
      name: "uploadFiles",
      tooltip: "Upload Files",
      iconURL: "/images/uploadfile.png",
      exec: function (editor: any) {
        if (!isClient) return; // Prevent running this on the server
        console.log(editor);
        const inputElement = document.createElement("input");
        inputElement.type = "file";
        inputElement.accept =
          ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.rar,.zip,.csv";
        inputElement.multiple = false;
        inputElement.style.display = "none";

        inputElement.onchange = async (event: any) => {
          const files = event.target.files;

          if (files) {
            for (let file of files) {
              const reader = new FileReader();
              reader.onload = async () => {
                const base64String = reader.result?.toString();
                if (base64String) {
                  try {
                    const response = await fetch(
                      `${process.env.NEXT_PUBLIC_ORIGIN_URI}/api/v1/blog/upload`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          file: base64String,
                          fileName: file.name,
                        }),
                      }
                    );

                    if (response.ok) {
                      const result = await response.json();
                      const fileURL = result?.url;

                      if (editor && editor.selection) {
                        editor.selection.insertHTML(
                          `<a href="${fileURL}" target="_blank" class="file-link">${file.name}</a>`
                        );
                        toast.success("File uploaded successfully!");
                      } else {
                        toast.error("Editor is not available.");
                        console.error("Editor or selection is undefined.");
                      }
                    } else {
                      toast.error("Failed to upload file.");
                      console.error(
                        "Failed to upload file:",
                        await response.text()
                      );
                    }
                  } catch (error) {
                    console.error("Error uploading file:", error);
                    toast.error("Error uploading file.");
                  }
                }
              };

              reader.onerror = () => {
                toast.error("Failed to read file.");
              };

              reader.readAsDataURL(file); // Read the file as Base64
            }
          }
        };

        inputElement.click();
      },
    },
  ];

  const editorConfig = {
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: "en",
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    buttons: buttons,
    uploader: {
      insertImageAsBase64URI: true,
    },
    width: 800,
    height: 842,
  };

  return (
    <div>
      <JoditEditor
        className="text-black w-full"
        ref={editor}
        value={content}
        config={editorConfig}
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
    </div>
  );
};

export default Editor;
