import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import AddIcon from "@mui/icons-material/Add";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "@/app/styles/style";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Table } from "flowbite-react";
// import { useDeleteEbookMutation, useGetAllEbookQuery } from "@/redux/features/ebooks/ebookApi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import SimpleBackdrop from "../../Loading/SimpleBackdrop";
import {
  useDeleteBlogMutation,
  useGetAllBlogQuery,
} from "@/redux/features/blog/blogsApi";
import { Button } from "flowbite-react";
import ModalDeleteBlog from "./ModalDeleteBlog";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {};

const AllBlogNew = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [blogId, setBlogId] = useState("");

  const { isLoading, data, refetch } = useGetAllBlogQuery(
    { type: "news", page: 1, limit: 10 },
    { refetchOnMountOrArgChange: true }
  );

  const [deleteBlog, { isSuccess, error, isLoading: isLoadingDel }] =
    useDeleteBlogMutation({});

  const [courseInfo, setCourseInfo] = useState({}) as any;
  const rows: any = [];

  {
    data &&
      data?.result?.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.title,
          slug: item.slug,
          created_at: format(item.createdAt),
        });
      });
  }

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Blog Deleted Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, refetch]);

  const handleDelete = async () => {
    const id = blogId;
    await deleteBlog(id);
  };

  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
  };

  const handleSubmit = () => {};

  return (
    <div className="container mx-auto mt-40">
      <Table hoverable>
        <Table.Head className="text-md">
          <Table.HeadCell>ชื่อ</Table.HeadCell>
          <Table.HeadCell>หมวดหมู่</Table.HeadCell>
          <Table.HeadCell>สร้างเมื่อ</Table.HeadCell>
          <Table.HeadCell>ดำเนินการ</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data &&
            data?.result?.map((item: any) => (
              <Table.Row key={item._id}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.title}
                </Table.Cell>
                <Table.Cell>{item.slug}</Table.Cell>
                <Table.Cell>{format(item.createdAt)}</Table.Cell>
                <Table.Cell className="flex gap-2 items-center">
                  <Link href={`/admin/edit-blog/${item._id}`}>
                    <Button outline color="warning" className="hover:text-white">
                      <HiOutlinePencilSquare
                        className="dark:text-white text-black"
                        size={20}
                      />
                    </Button>
                  </Link>
                  {/* <Button
                    outline
                    color="failure"
                    className="hover:text-white"
                    onClick={() => {
                      setOpen(!open);
                      setBlogId(item._id);
                    }}
                  >
                    <AiOutlineDelete
                      className="dark:text-white text-black"
                      size={20}
                    />
                  </Button> */}
                  <ModalDeleteBlog data={item} refetch={refetch} />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AllBlogNew;
