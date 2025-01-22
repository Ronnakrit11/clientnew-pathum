"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
// import JoditEditoir from 'jodit-react';
import "./Editor.css";
import { FaCodeMerge } from "react-icons/fa6";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Editor = ({ setPropsContent, defaultContent }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  // console.log("🚀 ~ file: Editor4.tsx:11 ~ Editor4 ~ content:", content)
  const [fileBase64, setFileBase64] = useState<string | null>(null);

  useEffect(() => {
    setContent(defaultContent);
  }, [defaultContent]);

  useEffect(() => {
    setPropsContent(content);
  }, [content]);

  const copyStringToClipboard = function (str: any) {
    var el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    // el.style = { position: "absolute", left: "-9999px" };
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
    // {
    //   name: "insertMergeField",
    //   tooltip: "Insert Merge Field",
    //   iconURL: "/images/merge.png",
    //   popup: (editor: any, current: any, self: any, close: any) => {
    //     function onSelected(e: any) {
    //       let mergeField = e.target.value;
    //       if (mergeField) {
    //         console.log(mergeField);
    //         editor.selection.insertNode(
    //           editor.create.inside.fromHTML("{{" + mergeField + "}}")
    //         );
    //       }
    //     }
    //     let divElement = editor.create.div("merge-field-popup");

    //     let labelElement = document.createElement("label");
    //     labelElement.setAttribute("class", "merge-field-label");
    //     // labelElement.text = 'Merge field: ';
    //     divElement.appendChild(labelElement);

    //     let selectElement = document.createElement("select");
    //     selectElement.setAttribute("class", "merge-field-select");
    //     selectElement.appendChild(
    //       createOptionGroupElement(facilityMergeFields, "Facility")
    //     );
    //     selectElement.appendChild(
    //       createOptionGroupElement(inspectionMergeFields, "Inspection")
    //     );
    //     selectElement.onchange = onSelected;
    //     divElement.appendChild(selectElement);

    //     console.log(divElement);
    //     return divElement;
    //   },
    // },
    // {
    //   name: "copyContent",
    //   tooltip: "Copy HTML to Clipboard",
    //   iconURL: "images/copy.png",
    //   exec: function (editor: any) {
    //     let html = editor.value;
    //     copyStringToClipboard(html);
    //   },
    // },
    "|",
    {
      name: "uploadFiles",
      tooltip: "Upload Files",
      iconURL: "/images/uploadfile.png",
      exec: function (editor: any) {
        const inputElement = document.createElement("input");
        inputElement.type = "file";
        inputElement.accept = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.rar,.zip,.csv";
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
                    // Send the file to Cloudinary or another API
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
                      console.log(result);
                      const fileURL = result.url;

                      // Insert the file link into the editor
                      editor.selection.insertHTML(
                        `<a href="${fileURL}" target="_blank" class="file-link">${file.name}</a>`
                      );
                      toast.success("File uploaded successfully!");
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
    // toolbarButtonSize: "tiny",
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    //defaultActionOnPaste: "insert_clear_html",
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
        // tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
    </div>
  );
};

export default Editor;
