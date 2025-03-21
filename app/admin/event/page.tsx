'use client'
import DashboardHero from '@/app/components/Admin/DashboardHero'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import AllCourses from "../../components/Admin/Course/AllCourses";
import BlogInformation from '@/app/components/Admin/Blog/BlogInformation'
import AllBlog from '@/app/components/Admin/Blog/AllBlog'
import AllEvent from '@/app/components/Admin/Blog/AllEvent'
// import AllEbook from '@/app/components/Admin/ebook/AllEbook'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex min-h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            {/* <BlogInformation /> */}
            {/* <AllBlog /> */}
            <AllEvent />
          </div>
        </div>
      </AdminProtected>
    </div>
  )
}

export default page