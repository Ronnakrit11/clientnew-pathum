"use client";
import React, { useEffect, useState } from "react";
import { Button, FileInput, Label, TextInput, Modal } from "flowbite-react";
import { useUploadThesisMutation } from "@/redux/features/thesis/thesisApi";
import toast from "react-hot-toast";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import { useGetUserByMajorQuery } from "@/redux/features/user/userApi";

const UploadThesis = ({
  user,
  refetch,
  majorId,
}: {
  user: any;
  refetch: any;
  majorId: string;
}) => {
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [uploadThesis, { isLoading, isSuccess, error }] =
    useUploadThesisMutation();
  const [openModal, setOpenModal] = useState(false);
  const [advisors, setAdvisors] = useState<string[]>([""]);
  const [authorIDs, setAuthorIDs] = useState<string[]>([user?._id]); // Change here: Store author ID
  const [title, setTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const { data } = useGetUserByMajorQuery({ major: majorId });
  console.log(authorIDs, advisors);
  // Function to handle adding authors by ID
  const addAuthor = (authorId: string, authorName: string) => {
    if (!authorIDs.includes(authorId)) {
      setAuthorIDs([...authorIDs, authorId]);
      setSearchAuthor(""); // Reset the search input after selecting
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result?.toString(); // Store the base64 content
        if (base64String) {
          setFileBase64(base64String);
        }
      };
      reader.readAsDataURL(file); // Read file as data URL
    } else {
      toast.error("กรุณาเลือกไฟล์ PDF");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileBase64) {
      toast.error("กรุณาอัพโหลดไฟล์ก่อนส่ง");
      return;
    }

    try {
      await uploadThesis({
        author_id: authorIDs, // Send the author IDs
        title,
        file: fileBase64,
        advisor: advisors,
        major: majorId,
      }).unwrap();

      toast.success("การส่งไฟล์สำเร็จ");
      refetch();
      setOpenModal(false);
    } catch (err) {
      toast.error("การส่งไฟล์ไม่สำเร็จ");
    }
  };

  // Add advisor
  const addAdvisor = () => {
    setAdvisors([...advisors, ""]); // Add a blank advisor input field
  };

  // Remove advisor
  const removeAdvisor = (index: number) => {
    setAdvisors(advisors.filter((_, i) => i !== index));
  };

  // Handle advisor change
  const handleAdvisorChange = (index: number, value: string) => {
    const newAdvisors = [...advisors];
    newAdvisors[index] = value;
    setAdvisors(newAdvisors);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("การส่งไฟล์สำเร็จ");
      refetch();
      setOpenModal(false);
    }
    if (error) {
      toast.error("การส่งไฟล์ไม่สำเร็จ");
    }
  }, [isSuccess, error]);

  const removeAuthor = (index: number) => {
    setAuthorIDs(authorIDs.filter((_, i) => i !== index));
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} color="dark">
        อัพโหลดปริญญานิพนธ์
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>อัพโหลดปริญญานิพนธ์</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <Label htmlFor="title" value="ชื่อหัวข้อปริญญานิพนธ์" />
              <TextInput
                id="title"
                type="text"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="advisor" value="อาจารย์ที่ปรึกษาปริญญานิพนธ์" />
              <div className="flex flex-col gap-2">
                {advisors.map((advisor, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <TextInput
                      id={`advisor-${index}`}
                      type="text"
                      className="w-full"
                      required
                      value={advisor}
                      onChange={(e) =>
                        handleAdvisorChange(index, e.target.value)
                      }
                    />
                    <Button
                      color="red"
                      onClick={() => removeAdvisor(index)}
                      className="ml-2"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                ))}
              </div>
              <Button onClick={addAdvisor} color="success" className="mt-2">
                <FaPlus />
              </Button>
            </div>
            <div>
              <Label htmlFor="author" value="สมาชิก" />

              {/* Only show the filtered results if searchAuthor has a value */}
              <div className="flex flex-col gap-2 mb-2">
                {authorIDs.map((authorID: string, index: number) => {
                  const authorName = data?.users.find(
                    (user: any) => user._id === authorID
                  )?.name; // Find the name from the ID
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <TextInput
                        id={`author-${index}`}
                        type="text"
                        className="w-full"
                        required
                        disabled
                        value={authorName || ""}
                      />
                      <Button
                        color="red"
                        onClick={() => removeAuthor(index)}
                        className="ml-2"
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  );
                })}
              </div>

              <TextInput
                id="author"
                type="text"
                required
                placeholder="ค้นหาชื่อสมาชิกเพื่อเลือก"
                onChange={(e: any) => setSearchAuthor(e.target.value)}
                value={searchAuthor}
              />
              {searchAuthor &&
                data?.users
                  .filter((user: any) => user.name.includes(searchAuthor))
                  .filter((user:any) => user.status === "สำเร็จการศึกษา")
                  .map((user: any) => (
                    <div
                      key={user._id}
                      className="flex items-center hover:bg-slate-100 p-4 bg-white border rounded-lg mb-2 cursor-pointer absolute z-50 w-full"
                      onClick={() => addAuthor(user._id, user.name)} // Add ID and name
                    >
                      <span className="w-full text-gray-700">{user.name}</span>
                    </div>
                  ))}
            </div>
            <div id="fileUpload" className="flex flex-col gap-2">
              <Label htmlFor="file" value="อัพโหลดไฟล์" />
              <FileInput
                id="file"
                name="file"
                className="file-input"
                onChange={handleFileChange}
                accept="application/pdf"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button onClick={handleSubmit} disabled={isLoading} color="dark">
            อัพโหลด
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            ยกเลิก
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UploadThesis;
