import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import TopBar from "../../DashBoard/Components/TopBar";
import Tree from "react-d3-tree";


const CareerMindMap = () => {
  const careerProgressData = {
    name: "Career Progression",
    children: [
      {
        name: "Education",
        children: [
          {
            name: "Elementary School",
            children: [
              { name: "1st Grade" },
              { name: "2nd Grade" },
              // ... other grades
            ],
          },
          {
            name: "Middle School",
            children: [
              { name: "6th Grade" },
              { name: "7th Grade" },
              // ... other grades
            ],
          },
          {
            name: "High School",
            children: [
              { name: "9th Grade" },
              { name: "10th Grade" },
              // ... other grades
            ],
          },
          {
            name: "College",
            children: [
              { name: "Freshman Year" },
              { name: "Sophomore Year" },
              // ... other years
            ],
          },
          {
            name: "University",
            children: [
              { name: "Bachelor's Degree" },
              { name: "Master's Degree" },
              // ... other degrees
              {
                name: "Ph.D.",
                children: [
                  { name: "Ph.D. Research" },
                  { name: "Dissertation Defense" },
                  // ... other Ph.D. stages
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Skills Development",
        children: [
          { name: "Programming" },
          { name: "Communication" },
          { name: "Teamwork" },
          // ... other skills
        ],
      },
      {
        name: "Professional Experience",
        children: [
          {
            name: "Internships",
            children: [
              { name: "Company A Internship" },
              { name: "Company B Internship" },
              // ... other internships
            ],
          },
          {
            name: "Entry-Level Positions",
            children: [
              { name: "Junior Developer" },
              { name: "Assistant Manager" },
              // ... other entry-level positions
            ],
          },
          {
            name: "Career Advancement",
            children: [
              { name: "Mid-level Manager" },
              { name: "Senior Developer" },
              // ... other advanced positions
            ],
          },
          {
            name: "Leadership Roles",
            children: [
              { name: "Team Lead" },
              { name: "Director" },
              // ... other leadership roles
            ],
          },
          {
            name: "Executive Positions",
            children: [
              { name: "Vice President" },
              { name: "CEO" },
              // ... other executive positions
            ],
          },
        ],
      },
      {
        name: "Job",
        children: [
          { name: "Job Search" },
          { name: "Job Application" },
          { name: "Job Interview" },
          // ... other job-related stages
        ],
      },
    ],
  };
  

  return (
    <>
      <TopBar />
      <div style={{ backgroundColor: "grey", width: "100vw", height: "100vh" }}>
        <div style={{ width: "100vw", height: "100vh" }}>
          <Tree data={careerProgressData} />
        </div>
      </div>
    </>
  );
};

export default CareerMindMap;
