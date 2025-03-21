"use client";
import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "../../../../redux/features/courses/coursesApi";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import CourseContentNew from "./CourseContentNew";
import CourseQuiz from "./CourseQuiz";

interface Link {
  title: string;
  url: string;
}

export interface IVideo {
  canPreview: boolean;
  videoUrl: string;
  title: string;
  description: string;
  videoLength: string;
  links: Link[];
  suggestion: string;
}

export interface IVideoData {
  videoSection: string;
  videoList: IVideo[];
}

export enum TabCourseEnum {
  CourseInformation,
  CourseData,
  CourseQuiz,
  CourseContent,
  CoursePreview,
}

type Props = {};

const CreateCourse = (props: Props) => {
  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created successfully");
      redirect("/admin/courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    categories: "",
    certificate: "Process",
    demoUrl: "",
    thumbnail: "",
    status: "public",
    limitWatchedTime: 1000,
    quiz: {
      preTestEnabled: false,
      preTestTitle: "แบบทดสอบก่อนเรียน",
      preTestId: "",
      postTestEnabled: false,
      postTestTitle: "แบบทดสอบหลังเรียน",
      postTestId: "",
    }
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState<IVideoData[]>([
    {
      videoSection: "Untitled Section",
      videoList: [
        {
          canPreview: false,
          videoUrl: "",
          title: "",
          description: "",
          videoLength: "",
          links: [
            {
              title: "",
              url: "",
            },
          ],
          suggestion: "",
        },
      ]
    }


  ]);


  const [courseData, setCourseData] = useState({});


  const handleSubmit = async () => {
    // Format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    // Format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    // Format course content array
    let newCourseContentData: any = []
    courseContentData.forEach(
      (courseContent) => {
        courseContent.videoList.forEach((video) => {
          const formattedVideoList = {
            videoSection: courseContent.videoSection,
            videoUrl: video.videoUrl,
            title: video.title,
            description: video.description,
            videoLength: video.videoLength,
            links: video.links,
            suggestion: video.suggestion,
          }
          newCourseContentData.push(formattedVideoList)
        });
      }
    );

    //   prepare our data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      categories: courseInfo.categories,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      status: courseInfo.status,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: newCourseContentData,
      limitWatchedTime: +courseInfo.limitWatchedTime,
      quiz: courseInfo.quiz,
      certificate: courseInfo.certificate
    };
    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    if (!isLoading) {
      await createCourse(data);
    }
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === TabCourseEnum.CourseInformation && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {active === TabCourseEnum.CourseData && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}

        {
          active === TabCourseEnum.CourseQuiz && (
            <CourseQuiz
              courseInfo={courseInfo}
              setCourseInfo={setCourseInfo}
              active={active}
              setActive={setActive}
            />
          )
        }

        {active === TabCourseEnum.CourseContent && (
          <CourseContentNew
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}

        {active === TabCourseEnum.CoursePreview && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
