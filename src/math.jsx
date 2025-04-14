import React, { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
};

export default function App() {
  const questionData = [
    {
      _id: {
        $oid: "67b2d480766c70208d83e5c5",
      },
      QID: "P0100179",
      QStart: "P0100179",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A block of mass 1 kg slides down on a rough inclined plane of inclination $60^{\\circ}$ starting from its top. If the coefficient of kinetic friction is 0.5 and length of the plane is 1 m , then work done against friction is -\\\\",
      OptionsEnglish:
        "\\\\(1) 9.82 J\\\\(2) 4.94 J\\\\(3) 2.45 J\\\\(4) 1.96 J",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "3",
      SolutionSteps:
        "Force experienced by the body (F)\n(F) = µ mg cos= 0.5 × 1 × 9.8 × cos60º\n= 1.5 × 0.5 = 2.45 N\nWork done (W) = F.d = 2.45\nHence the correct answer will be (3)",
      SolutionVideo: "",
      QEnd: "P0100179",
      "KSolutionSteps:":
        "\\\\Force experienced by the body ( F )\\\\(F) $=\\mu \\mathrm{mg} \\cos \\theta=0.5 \\times 1 \\times 9.8 \\times \\cos 60^{\\circ}$\\\\$=1.5 \\times 0.5=2.45 \\mathrm{~N}$\\\\Work done (W) = F.d = 2.45\\\\Hence the correct answer will be (3)\\\\",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5c6",
      },
      QID: "P0100201",
      QStart: "P0100201",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A force of 5 N making an angle $\\theta$ with the horizontal acting on an object displaces it by 0.4 m along the horizontal direction. If the object gains kinetic energy of 1 J the horizontal component of the force is\\\\",
      OptionsEnglish: "\\\\(1) 1.5 N\\\\(2) 2.5 N\\\\(3) 3.5 N\\\\(4) 4.5 N",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati: "\\\\",
      OptionsGajarati: "",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "2",
      SolutionSteps:
        "Work done by the force\nW = F s cos \n×cos = 2 cos \nFrom work energy theorem\nwork done = change in kinetic energy\n\n5N\n2 cos = 1 J\n1\ncos\n2\n\nHorizontal component\n1\nFcos\n5\n2.5 N\n2\n\n\n",
      SolutionVideo: "",
      QEnd: "P0100201",
      Images: {
        "2024_12_17_d5bc6ae72ce6821007d5g-2":
          "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",
      },
      "KSolutionSteps:":
        "\\\\Work done by the force\\\\$\\mathrm{W}=\\mathrm{F} \\mathrm{s} \\cos \\theta$\\\\$=5 \\times 0.4 \\cos \\theta=2 \\cos \\theta$\\\\From work energy theorem\\\\work done = change in kinetic energy\\\\\\includegraphics[max width=\\textwidth, center]{2024_12_17_d5bc6ae72ce6821007d5g-2}\\\\$2 \\cos \\theta=1 \\mathrm{~J}$\\\\$\\cos \\theta=\\frac{1}{2}$\\\\$\\therefore$ Horizontal component\\\\$=\\mathrm{F} \\cos \\theta=5 \\times \\frac{1}{2}=2.5 \\mathrm{~N}$\\\\",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5c7",
      },
      QID: "P0100205",
      QStart: "P0100205",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\If a person is pushing a box inside a moving train, The work done in the frame of earth will be (where $\\vec{s}$ is the displacement of the box in the train and $\\vec{s}_{0}$ is the displacement of the train relative to the ground) :-\\\\",
      OptionsEnglish:
        "\\\\(1) $\\overrightarrow{\\mathrm{F}} \\cdot \\vec{S}_{0}$\\\\(2) $\\vec{F} . \\vec{S}$\\\\(3) $\\overrightarrow{\\mathrm{F}} .\\left(\\overrightarrow{\\mathrm{S}}+\\overrightarrow{\\mathrm{S}}_{0}\\right)$\\\\(4) Zero",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "3",
      SolutionSteps: "W =\n\nF d.\n=\n\nF.(\n)\n\n\nS\nS\n\n0",
      SolutionVideo: "",
      QEnd: "P0100205",
      "KSolutionSteps:":
        "\\[\\mathrm{W}=\\overrightarrow{\\mathrm{F}} . \\overrightarrow{\\mathrm{d}}=\\overrightarrow{\\mathrm{F}} \\cdot\\left(\\overrightarrow{\\mathrm{~S}}+\\overrightarrow{\\mathrm{S}}_{0}\\right)\\]",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5c8",
      },
      QID: "P0100213",
      QStart: "P0100213",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A force acts on a 3 gram particle such that its position $x=3 t-4 t^{2}+t^{3}$, where x is in metre and t is in second. The work done during first 4 s is\\\\",
      OptionsEnglish: "\\\\(1) 825 mJ\\\\(2) 285 mJ\\\\(3) 528 mJ\\\\(4) zero",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "3",
      SolutionSteps:
        "2\n3\nx\n3t – 4t\nt ,\n\n\n2\ndx\n3\n8t\n3t ,\nxt \n\n\n(t\n0)\n3m/s\n\n\n\n(t\n4)\n19m / s\n\n\n",
      SolutionVideo: "",
      QEnd: "P0100213",
      "KSolutionSteps:":
        "\\[\\begin{aligned}& \\mathrm{x}=3 \\mathrm{t}-4 \\mathrm{t}^{2}+\\mathrm{t}^{3}, \\\\& v(\\mathrm{t}=0)=3 \\mathrm{~m} / \\mathrm{s}\\end{aligned}\\]\\[\\begin{aligned}& \\frac{d x}{x t}=3-8 t+3 t^{2}, \\\\& v(t=4)=19 \\mathrm{~m} / \\mathrm{s}\\end{aligned}\\]",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5c9",
      },
      QID: "P0100218",
      QStart: "P0100218",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English: "\\\\The work performed on an object does not depend upon the ",
      OptionsEnglish:
        "\\\\(1) force applied\\\\(2) angle at which force is inclined to the displacement\\\\(3) initial velocity of the object\\\\(4) displacement",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "3",
      SolutionSteps: "",
      SolutionVideo: "",
      QEnd: "P0100218",
      "KSolutionSteps:": "\\\\",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5ca",
      },
      QID: "P0100231",
      QStart: "P0100231",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A particle is acted upon by a conservative force $F=(7 \\hat{i}-6 \\hat{j}) \\mathrm{N}$. The work done by the force when the particle moves from origin $(0,0)$ to the position $(-3 m, 4 m)$ is given by\\\\",
      OptionsEnglish:
        "\\\\(1) 3 J\\\\(2) 10 J\\\\(3) -45 J\\\\(4) None of these",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "3",
      SolutionSteps:
        "ˆ\nˆ\nr\n3i\n4j, w\nF.r\n21\n24\n45 J\n\n\n\n\n\n\n\n\n",
      SolutionVideo: "",
      QEnd: "P0100231",
      "KSolutionSteps:":
        "\\[\\overrightarrow{\\mathrm{r}}=-3 \\hat{\\mathrm{i}}+4 \\hat{\\mathrm{j}}, \\mathrm{w}=\\overrightarrow{\\mathrm{F}} \\cdot \\overrightarrow{\\mathrm{r}}=-21-24=-45 \\mathrm{~J}\\]",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5cb",
      },
      QID: "P0100237",
      QStart: "P0100237",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A man wishes to pull a crate 15 m across a rough floor by exerting a force of 100\\\\N . The coefficient of kinetic friction is 0.25 . For the man to do the maximum work, the angle between the force and the horizontal should be:\\\\",
      OptionsEnglish:
        "\\\\(1) 0\\\\(2) $14^{\\circ}$\\\\(3) $43^{\\circ}$\\\\(3) $66^{\\circ}$",
      Hindi:
        "\\\\एक आदमी एक बॉक्स को खुरदरे फर्श पर 100 N बल लगाकर 15 m तक खींचना चाहता है। गतिक घर्षण-गुणांक 0.25 है। आदमी को अधिकतम कार्य के लिये बल तथा क्षैतिज के मध्य कोण होगा।\\\\",
      OptionsHindi:
        "\\\\(1) 0\\\\(2) $14^{\\circ}$\\\\(3) $43^{\\circ}$\\\\(3) $66^{\\circ}$",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "1",
      SolutionSteps:
        "Work done = F.d\nFdcos\n\n\n\nwork is maximum for = 0°",
      SolutionVideo: "",
      QEnd: "P0100237",
      "KSolutionSteps:":
        "\\\\Work done $=\\vec{F} . \\bar{d}=F d \\cos \\theta$\\\\work is maximum for $\\theta=0^{\\circ}$\\\\",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5cc",
      },
      QID: "P0100255",
      QStart: "P0100255",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\The work done by a force on a body moving from $(1,4) \\mathrm{m}$ to $(3,8) \\mathrm{m}$ is 44 J . The force can be :\\\\",
      OptionsEnglish:
        "\\\\(1) $8 \\hat{\\mathrm{i}}+6 \\hat{\\mathrm{j}} \\mathrm{N}$\\\\(2) $8 \\hat{\\mathrm{i}}-6 \\hat{\\mathrm{j}} \\mathrm{N}$\\\\(3) $6 \\hat{\\mathrm{i}}-8 \\hat{\\mathrm{j}} \\mathrm{N}$\\\\(3) $6 \\hat{i}+8 \\hat{j} \\mathrm{~N}$",
      Hindi:
        "\\\\एक वस्तु को $(1,4) \\mathrm{m}$ से $(3,8) \\mathrm{m}$ तक गति कराने में एक बल द्वारा किया गया कार्य 44 J है। बल हो सकता है :\\\\",
      OptionsHindi:
        "\\\\(1) $8 \\hat{i}+6 \\hat{j} \\mathrm{~N}$\\\\(2) $8 \\hat{\\mathrm{i}}-6 \\hat{\\mathrm{j}} \\mathrm{N}$\\\\(3) $6 \\hat{i}-8 \\hat{\\mathrm{j}} \\mathrm{N}$\\\\(3) $6 \\hat{i}+8 \\hat{\\mathrm{j}} \\mathrm{N}$",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "4",
      SolutionSteps:
        "W =\nS\n·\nF\n\n\n44 =\n)jˆ\n4\niˆ\n2\n(\nF\n\n\nby hit and trial\n)jˆ\n8\niˆ\n6\n(\n\n·\n)jˆ\n4\niˆ\n2\n(\n\n= 44 J",
      SolutionVideo: "",
      QEnd: "P0100255",
      "KSolutionSteps:":
        "\\\\$\\mathrm{W}=\\overrightarrow{\\mathrm{F}} \\cdot \\overrightarrow{\\mathrm{s}}$\\\\$44=\\vec{F}(2 \\hat{i}+4 \\hat{j})$\\\\by hit and trial $(6 \\hat{i}+8 \\hat{j}) \\cdot(2 \\hat{i}+4 \\hat{j})=44 \\mathrm{~J}$\\\\",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5cd",
      },
      QID: "P0100268",
      QStart: "P0100268",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A block of mass $m$ is suspended by a light thread from an elevator. The elevator is accelerating upward with uniform acceleration a. The work done during $t$ second\\\\by the tension in the thread is\\\\",
      OptionsEnglish:
        "\\\\(1) zero\\\\(2) $\\frac{m}{2}(g-a) a t^{2}$\\\\(3) $\\frac{m}{2}(g+a) a t^{2}$\\\\(4) $\\frac{m}{2} g a t^{2}$",
      Hindi:
        "\\\\m द्रव्यमान का एक ब्लॉक एक एलिवेटर से एक हल्की डोरी द्वारा लटका हुआ है। एलिवेटर ऊपर की ओर एकसमान त्वरण a से त्वरित है। डोरी में तनाव द्वारा t सेकण्ड में किया गया कार्य है:\\\\",
      OptionsHindi:
        "\\\\(1) शून्य\\\\(2) $\\frac{m}{2}(g-a) a t^{2}$\\\\(3) $\\frac{m}{2}(g+a) a t^{2}$\\\\(4) $\\frac{m}{2} g a t^{2}$",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "3",
      SolutionSteps:
        "T = m(g + a)\nw = T × d\n2\n1\nTm(g\na)\nat\n2\n\n\nT\nM\na\n2\nm (g\na)at\n2\n\n",
      SolutionVideo: "",
      QEnd: "P0100268",
      Images: {
        "2024_12_17_0c335bd776f4cbb857efg-2":
          "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",
      },
      "KSolutionSteps:":
        "\\[\\begin{aligned}& \\mathrm{T}=\\mathrm{m}(\\mathrm{~g}+\\mathrm{a}) \\\\& \\mathrm{w}=\\mathrm{T} \\times \\mathrm{d} \\\\& =\\mathrm{Tm}(\\mathrm{~g}+\\mathrm{a}) \\frac{1}{2} \\mathrm{at}^{2}\\end{aligned}\\]\\includegraphics[max width=\\textwidth, center]{2024_12_17_0c335bd776f4cbb857efg-2}\\\\$=\\frac{\\mathrm{m}}{2}(\\mathrm{~g}+\\mathrm{a}) \\mathrm{ta}^{2}$\\\\",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5ce",
      },
      QID: "P0100273",
      QStart: "P0100273",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English: "\\\\A force does not perform any work during\\\\",
      OptionsEnglish:
        "\\\\(1) A displacement which is parallel to the force\\\\(2) A displacement which is perpendicular to the force\\\\(3) The motion of the body\\\\(4) Collision of two bodies",
      Hindi: "\\\\एक बल कोई कार्य नहीं करता है।\\\\",
      OptionsHindi:
        "\\\\(1) उस विस्थापन में जो बल के समान्तर होता है\\\\(2) उस विस्थापन में जो बल के लम्बवत् होता है\\\\(3) वस्तु की गति के दौरान\\\\(4) दोनों वस्तुओं की टक्कर के दौरान",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "2",
      SolutionSteps: "W = F.d = Fd cos Q\nfor = 90°, cos= 0",
      SolutionVideo: "",
      QEnd: "P0100273",
      "KSolutionSteps:":
        "\\\\$\\mathrm{W}=\\mathrm{F} . \\mathrm{d}=\\mathrm{Fd} \\cos \\mathrm{Q}$\\\\for $\\theta=90^{\\circ}, \\cos \\theta=0$\\\\",
      Status: "UNCHECKED",
    },

    {
      _id: {
        $oid: "67b2d480766c70208d83e5d0",
      },
      QID: "P0100113",
      QStart: "P0100113",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A 50 kg man with 20 kg load on his head climbs up 20 steps of 0.25 m height each.\\\\The work done by the man on the block during climbing is\\\\",
      OptionsEnglish: "\\\\(1) 5 J\\\\(2) 350 J\\\\(3) 1000 J\\\\(4) 3540 J",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati:
        "\\\\50 kg નો એક માણસ 20 kg સામાન તેના માથે લઈને 20 પગથિયા ચડે છે. 0.25 m ઊંચાઈનું એક પગથિયું છે. માણસ દ્દારા ચઢાણ દરમ્યાન બ્લોક પર થતું કાર્ય\\\\",
      OptionsGajarati: "\\\\(1) 5 J\\\\(2) 350 J\\\\(3) 1000 J\\\\(4) 3540 J",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "3",
      SolutionSteps: "W = 20 × 10 × 20 × 0.25 = 1000 J",
      SolutionVideo: "",
      QEnd: "P0100113",
      "KSolutionSteps:":
        "\\[\\mathrm{W}=20 \\times 10 \\times 20 \\times 0.25=1000 \\mathrm{~J}\\]",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5d1",
      },
      QID: "P0100114",
      QStart: "P0100114",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A particle moves from position $\\vec{r}_{1}=3 \\hat{i}+2 \\hat{j}-6 \\hat{k}$ to position $\\vec{r}_{2}=14 \\hat{i}+13 \\hat{j}+9 \\hat{k}$ under the action of force $4 \\hat{i}+\\hat{j}+3 \\hat{k} N$. The work done by this force will be\\\\",
      OptionsEnglish: "\\\\(1) 100 J\\\\(2) 50 J\\\\(3) 200 J\\\\(4) 75 J",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati:
        "\\\\બળ $4 \\hat{i}+\\hat{j}+3 \\hat{k} N$ વડે કાને સ્થાન $\\vec{r}_{1}=3 \\hat{i}+2 \\hat{j}-6 \\hat{k}$ થી $\\vec{r}_{2}=14 \\hat{i}+13 \\hat{j}+9 \\hat{k}$ ખસે છે. આ બળ દ્વારા થતું કાર્ય\\\\",
      OptionsGajarati: "\\\\(1) 100 J\\\\(2) 50 J\\\\(3) 200 J\\\\(4) 75 J",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "1",
      SolutionSteps: "W = F .\n2\n1\n(r – r) = 100 J",
      SolutionVideo: "",
      QEnd: "P0100114",
      "KSolutionSteps:":
        "\\[\\mathrm{W}=\\overline{\\mathrm{F}} \\cdot\\left(\\bar{\\Gamma}_{2}-\\overline{\\mathrm{T}_{1}}\\right)=100 \\mathrm{~J}\\]",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5d2",
      },
      QID: "P0100115",
      QStart: "P0100115",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A ball is released from the top of a tower. The ratio of work done by force of gravity\\\\in first, second and third second of the motion of the ball is\\\\",
      OptionsEnglish:
        "\\\\(1) $1: 2: 3$\\\\(2) $1: 4: 9$\\\\(3) $1: 3: 5$\\\\(4) $1: 5: 3$",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati:
        "\\\\ટાવરના ટોચ પરથી બોલને મુક્ત કરવામાં આવે છે. બોલની પ્રથમ, દ્વિતીય અને તૃતીય સેકન્ડમાં ગતિ દરમ્યાન ગુરૂત્વાકર્ષણ બળ વડે થતા કાર્યનો ગુણોત્તર\\\\",
      OptionsGajarati:
        "\\\\(1) $1: 2: 3$\\\\(2) $1: 4: 9$\\\\(3) $1: 3: 5$\\\\(4) $1: 5: 3$",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "3",
      SolutionSteps:
        "S1 = 1\n2 g 12 , s2 = 1\n2 g 22 , S3 = 1\n2 g 32\nS2 – S1 = 1\n2 g 3, S3 –S2 = 1\n2 g 5\nW1 = (mg) S1, W2 = (mg) (S2 – S1) , W3 = (mg) (S3 – S2)\nW1 : W2 : W3 = 1 : 3 : 5",
      SolutionVideo: "",
      QEnd: "P0100115",
      "KSolutionSteps:":
        "\\[\\begin{aligned}& \\mathrm{S}_{1}=\\frac{1}{2} \\mathrm{~g} 1^{2}, \\mathrm{~s}_{2}=\\frac{1}{2} \\mathrm{~g} 2^{2}, \\mathrm{~S}_{3}=\\frac{1}{2} \\mathrm{~g} 3^{2} \\\\& \\mathrm{~S}_{2}-\\mathrm{S}_{1}=\\frac{1}{2} \\mathrm{~g} 3, \\mathrm{~S}_{3}-\\mathrm{S}_{2}=\\frac{1}{2} \\mathrm{~g} 5 \\\\& \\mathrm{~W}_{1}=(\\mathrm{mg}) \\mathrm{S}_{1}, \\mathrm{~W}_{2}=(\\mathrm{mg})\\left(\\mathrm{S}_{2}-\\mathrm{S}_{1}\\right), \\mathrm{W}_{3}=(\\mathrm{mg})\\left(\\mathrm{S}_{3}-\\mathrm{S}_{2}\\right) \\\\& \\mathrm{W}_{1}: \\mathrm{W}_{2}: \\mathrm{W}_{3}=1: 3: 5\\end{aligned}\\]",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5d3",
      },
      QID: "P0100116",
      QStart: "P0100116",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A block of mass m is suspended by a light thread from an elevator. The elevator is accelerating upward with uniform acceleration a. The work done by tension on the block during t seconds is $(\\mathrm{u}=0)$ :\\\\\\includegraphics[max width=\\textwidth, center]{2024_12_17_7c4330285e554df6af89g-1}",
      OptionsEnglish:
        "\\\\(1) $\\frac{m}{2}(g+a) a t^{2}$\\\\(2) $\\frac{m}{2}(g-a) a t^{2}$\\\\(3) $\\frac{\\mathrm{m}}{2} \\mathrm{gat}^{2}$\\\\(4) 0",
      Hindi: "\\\\",
      OptionsHindi: "",
      Gujarati:
        "\\\\m દળનો બ્લોક હલકી દોરી વડે લિફટ પરથી લટકાવામાં આવે છે. લિફટ ઉપરની દિશામાં એક સમાન પ્રવેગથી પ્રવેગિત થાય છે. $t$ સમય દરમ્યાન $u=0$ બ્લોક .પર તણાવ વડે થતું કાર્ય એ ........\\\\\\includegraphics[max width=\\textwidth, center]{2024_12_17_7c4330285e554df6af89g-2}",
      OptionsGajarati:
        "\\\\(1) $\\frac{m}{2}(g+a) a t^{2}$\\\\(2) $\\frac{m}{2}(g-a) a t^{2}$\\\\(3) $\\frac{\\mathrm{m}}{2} \\mathrm{gat}^{2}$\\\\(4) 0",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "1",
      SolutionSteps:
        "T = mg + ma, S = 1\n2 at2\nWT = T × S\n=\n2\nm(g\na)at\n2\n",
      SolutionVideo: "",
      QEnd: "P0100116",
      Images: {
        "2024_12_17_7c4330285e554df6af89g-1":
          "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",
        "2024_12_17_7c4330285e554df6af89g-2":
          "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",
      },
      "KSolutionSteps:":
        "\\[\\begin{aligned}& \\mathrm{T}=\\mathrm{mg}+\\mathrm{ma}, \\mathrm{~S}=\\frac{1}{2} \\mathrm{at}^{2} \\\\& \\mathrm{~W}_{\\mathrm{T}}=\\mathrm{T} \\times \\mathrm{S} \\\\& =\\frac{\\mathrm{m}(\\mathrm{~g}+\\mathrm{a}) \\mathrm{at} \\mathrm{t}^{2}}{2}\\end{aligned}\\]",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5d4",
      },
      QID: "P0100117",
      QStart: "P0100117",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\The work done in pushing a block of mass 10 kg from bottom to the top of a frictionless\\\\inclined plane 5 m long and 3 m high is- $\\left(\\mathrm{g}=9.8 \\mathrm{~m} / \\mathrm{sec}^{2}\\right)$\\\\",
      OptionsEnglish: "\\\\(1) 392 J\\\\(2) 294 J\\\\(3) 98 J\\\\(4) 0.98 J",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati:
        "\\\\5 m લાંબુ અને 3 m ઉંચાઈ ધરાવતા ઘર્ષાગરહિતઢાળવાળી સપાટી પર 10 kg બ્લોકને તળિયેથી ટોચ પર લઈ જવા કરવું\\\\પડતું કાર્ય $\\left(\\mathrm{g}=9.8 \\mathrm{~m} / \\mathrm{sec}^{2}\\right)$\\\\",
      OptionsGajarati: "\\\\(1) 392 J\\\\(2) 294 J\\\\(3) 98 J\\\\(4) 0.98 J",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "2",
      SolutionSteps: "4\n5\n3\nw = mgh, cos = 4/5\n= 10 × 9.8 × 3 = 294 joule",
      SolutionVideo: "",
      QEnd: "P0100117",
      Images: {
        "2024_12_17_84580d4a9d669783619bg-2":
          "/9j/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIAR0BRgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APf6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAorI8Q+ItN8MaTNqeqXAjt4+Ao5Z27Io7sef5nABI+cvF3j7xZr8sWtxTXmlaWJHgs1tpWj5wNx3A5dhxn07c0DsfUlFFFAgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArm/GHjLS/B2lm8v5N0zArBbKfnlb0HoPU9B7nANDx78QdO8E2X7wifUpVJgtFYZPX52P8Kgjr/kcL4Q8Ban411g+L/HKs8chDW1k4Khl6jKn7sY7KeWySf9oGVNE8M678WdYTxF4oaS20NDm1tUOBIM/dQdl/vP1boPVbXx8toLLQfD1tbRJFBFJIkcaDAUBVAAFe2IixxqiKFVQAFAwAPSvGf2hv8AkFaH/wBdpf8A0EUgPaKKKKYgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvO/iN8TbTwlA+n6ftutckX5IgcrDnoX9+eF6nvgc1n/EL4my6fenwz4XjN5rkp8t3jG/yCeNo9X/Rfc8VN8PfhgmgSf254gb7br0xMhZzvEDHrgn7znux79PUgyh4E+GVxNf/APCVeNC13qs7ebHbTciMnozjpu9F6L06gY9doooEFeL/ALQ3/IK0P/rtL/6CK9orxf8AaG/5BWh/9dpf/QRQNHtFFFFAgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooqC4njtoZJppEjiRSzu7YAA6knt9aAJGIAJJwPX0rx3xr8StQ1zUj4V8Co9zdynZLeQn8xG3QD1fjHb1FHxP421f4i6q/hTwUrfYmBF1edA6dCSf4Y+ee7cDvg+j+CfAum+CtK+z2y+deSL/pF2w+aU+nsvoo/HmkPYzfh98N7LwXbfap2W61iRcS3JX5UH91B6ep6n2HFd8OlFFMQUUUUAFeL/tDf8grQ/wDrtL/6CK9orxf9ob/kFaH/ANdpf/QRQNHtFFFFAgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiisvXNd0/w5pk2o6pcrBbx9yeWPZVHdj6CgCzqOoWmlWM99fXCW9tCu6SR2wFHrXh2ra1rnxj13+xNCWWy8OQNm4uGBAcZ+8/r/ALKeoyemVRI/EXxs1vzJfM07wraS8AEcn2/vSEHqeFH1w3tei6Hp3h7TItP0u2S3to+ir/Ee5J7k0h7FTwx4V0zwjpKafpkBRessrcvK/wDeY9z7dBW6OlFFMQUUUUAFFFFABXi/7Q3/ACCtD/67S/8AoIr2ivF/2hv+QVof/XaX/wBBFA0e0UUUUCCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoooo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",
      },
      "KSolutionSteps:":
        "\\\\\\includegraphics[max width=\\textwidth, center]{2024_12_17_84580d4a9d669783619bg-2}\\[\\begin{aligned}& \\mathrm{w}=\\mathrm{mgh}, \\cos \\theta=4 / 5 \\\\& =10 \\times 9.8 \\times 3=294 \\text { joule }\\end{aligned}\\]",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5d5",
      },
      QID: "P0100118",
      QStart: "P0100118",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A rod of length 1 m and mass 0.5 kg hinged at one end, is initially hanging vertical. The other end is now raised slowly until it makes an angle $60^{\\circ}$ with the vertical. The required work is: (use $\\mathrm{g}=10 \\mathrm{~m} / \\mathrm{s}^{2}$ )\\\\",
      OptionsEnglish:
        "\\\\(1) $\\frac{5}{2} \\mathrm{~J}$\\\\(2) $\\frac{5}{4} \\mathrm{~J}$\\\\(3) $\\frac{17}{8} \\mathrm{~J}$\\\\(4) $\\frac{5 \\sqrt{3}}{4} \\mathrm{~J}$",
      Hindi: "",
      OptionsHindi: "\\\\",
      Gujarati:
        "\\\\1 m નો સળિયાને શરૂઆતમાં ઉભો લટકાવવામાં આવે છે. તેના એક છેડ 0.5 kg નું દળ લટકાવેલ છે. ઉભી દિશા સાથે\\\\$60^{\\circ}$ નો ખૂણો બનાવે તે રીતે બીજા છેડાને ધીમેથી ઉંચો કરવામાં આવે તો કરવું, પડતું કાર્ય ? ( $\\left.\\mathrm{g}=10 \\mathrm{~m} / \\mathrm{s}^{2}\\right)$\\\\",
      OptionsGajarati:
        "\\\\(1) $\\frac{5}{2} \\mathrm{~J}$\\\\(2) $\\frac{5}{4} \\mathrm{~J}$\\\\(3) $\\frac{17}{8} \\mathrm{~J}$\\\\(4) $\\frac{5 \\sqrt{3}}{4} \\mathrm{~J}$\\section*{",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "2",
      SolutionSteps:
        "Wa + Wc = K = 0,\nWa – mg\n–\ncos60º\n2\n2\n\n\n\n\n\n\n\n\n= 0\nWa = mg\n4\n= (0.5) (10)\n1\n4\n\n\n\n\n\n= 5\n4 J.",
      SolutionVideo: "",
      QEnd: "P0100118",
      "KSolutionSteps:":
        "\\[\\begin{aligned}& \\mathrm{W}_{\\mathrm{a}}+\\mathrm{W}_{\\mathrm{c}}=\\Delta \\mathrm{K}=0, \\quad \\mathrm{~W}_{\\mathrm{a}}-\\mathrm{mg}\\left(\\frac{\\ell}{2}-\\frac{\\ell}{2} \\cos 60^{\\circ}\\right)=0 \\\\& \\mathrm{~W}_{\\mathrm{a}}=\\frac{\\mathrm{mg} \\ell}{4}=(0.5)(10)\\left(\\frac{1}{4}\\right)=\\frac{5}{4} \\mathrm{~J} .\\end{aligned}\\]",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5d6",
      },
      QID: "P0100010",
      QStart: "P0100010",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A uniform force of $(3 \\hat{i}+\\hat{j})$ newton acts on a particle of mass 2 kg . Hence the particle is displaced from position $(2 \\hat{i}+\\hat{k})$ metre to position $(4 \\hat{i}+3 \\hat{j}-\\hat{k})$ metre. The work done by the force on the particle is :\\\\",
      OptionsEnglish: "\\\\(1) 13 J\\\\(2) 15 J\\\\(3) 9 J\\\\(4) 6 J",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati:
        "\\\\2 kg દળના કણા પર ( $3 \\hat{\\mathrm{i}}+\\hat{\\mathrm{j}}$ ) જેટલું એકરપ બળ લાગે છે. આથી કણ $(2 \\hat{i}+\\hat{k})$ મીટરથી $(4 \\hat{i}+3 \\hat{j}-\\hat{k})$ મીટર ખસે છે. કણ પર બળ વડે થતું કાર્ય:\\\\",
      OptionsGajarati:
        "\\\\(1) 13 J\\\\(2) 15 J\\\\(3) 9 J\\\\(4) 6 J\\section*{",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "3",
      SolutionSteps:
        "Here,\nˆ\nˆ\nF\n(3i\nj) N\n\n\n\nInitial position,\n1\nˆ\nˆ\nr\n(2i\nk)m\n\n\n\nFinal position,\n2\nˆ\nˆ\nˆ\nr\n(4i\n3j\nk)m\n\n\n\n\nDisplacement,\n2\n1\nr\nr\nr\n\n\n\n\n\nˆ\nˆ\nˆ\nˆ\nˆ\nˆ\nˆ\nˆ\nr\n(4i\n3j\nk)m (2i\nk)m\n2i\n3j\n2k m\n\n\n\n\n\n\n\n\n\nWork done,\nˆ\nˆ\nˆ\nˆ\nˆ\nW\nE.r\n(3i\nj).(2i\n3j\n2k)\n6\n3\n9J\n\n\n\n\n\n\n\n\n",
      SolutionVideo: "",
      QEnd: "P0100010",
      "KSolutionSteps:":
        "\\\\Here, $\\vec{F}=(\\hat{i} \\hat{i}+\\hat{j}) \\mathrm{N}$\\\\Initial position, $\\overrightarrow{\\mathrm{r}}_{1}=(2 \\hat{\\mathbf{i}}+\\hat{k}) \\mathrm{m}$\\\\Final position, $\\vec{r}_{2}=(4 \\hat{i}+3 \\hat{j}-\\hat{k}) \\mathrm{m}$\\\\Displacement, $\\vec{r}=\\vec{r}_{2}-\\vec{r}_{1}$\\[\\overrightarrow{\\mathbf{r}}=(4 \\hat{i}+3 \\hat{j}-\\hat{k}) m-(2 \\hat{i}+\\hat{k}) m=2 \\hat{i}+3 \\hat{j}-2 \\hat{k} m\\]Work done,\\[\\mathrm{W}=\\overrightarrow{\\mathrm{E}} \\cdot \\overrightarrow{\\mathrm{r}}=(3 \\hat{\\mathbf{i}}+\\hat{\\mathrm{j}}) \\cdot(2 \\hat{\\mathbf{i}}+3 \\hat{\\mathrm{j}}-2 \\hat{\\mathbf{k}})=6+3=9 \\mathrm{~J}\\]",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5d7",
      },
      QID: "P0100016",
      QStart: "P0100016",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A particle moves from a point $(-2 \\hat{i}+5 \\hat{j})$ to $(4 \\hat{\\mathbf{j}}+3 \\hat{k})$ when a force of $(4 \\hat{i}+3 \\hat{j}) N$ is applied. How much work has been done by the force ?\\\\",
      OptionsEnglish: "\\\\(1) 8 J\\\\(2) 11 J\\\\(3) 5 J\\\\(4) 2 J",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati:
        "\\\\કણ બિંદુ $(-2 \\hat{\\mathbf{i}}+5 \\hat{j})$ થી $(4 \\hat{\\mathbf{j}}+3 \\hat{\\mathrm{k}})$ પર બળ $(4 \\hat{\\mathrm{i}}+3 \\hat{\\mathrm{j}}) \\mathrm{N}$ આપવાથી ખસે છે. બળ દ્વારા થતું કાર્ય\\\\",
      OptionsGajarati:
        "\\\\(1) 8 J\\\\(2) 11 J\\\\(3) 5 J\\\\(4) 2 J\\section*{",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "3",
      SolutionSteps:
        "Here\n1\nˆ\nˆ\nr\n( 2i\n5j)m\n\n\n\n,\n2\nˆ\nˆ\nr\n(4j\n3k)m\n\n\n\nˆ\nˆ\nF\n(4i\n3j)N\n\n\n\n, W = ?\nWork done by force F in moving from\n1rto\n2r.\n2\n1\nW\nF.(r\nr )\n\n\n\n\nˆ\nˆ\nˆ\nˆ\nˆ\nˆ\nW\n(4i\n3j).(4j\n3k\n2i\n5j)\n\n\n\n\n\nˆ\nˆ\nˆ\nˆ\nˆ\n(4i\n3j).(2i\nj\n3k)\n8\n( 3)\n5J\n\n\n\n\n\n",
      SolutionVideo: "",
      QEnd: "P0100016",
      "KSolutionSteps:":
        "\\\\Here $\\vec{i}_{1}=(-2 \\hat{i}+5 \\hat{j}) \\mathrm{m}, \\vec{r}_{2}=(4 \\hat{j}+3 \\hat{k}) \\mathrm{m}$\\[\\vec{F}=(4 \\hat{i}+3 \\hat{j}) N, W=?\\]Work done by force $F$ in moving from $\\vec{r}_{1}$ to $\\vec{r}_{2}$.\\[\\begin{aligned}\\mathrm{W} & =\\overrightarrow{\\mathrm{F}} \\cdot\\left(\\overrightarrow{\\mathrm{r}}_{2}-\\overrightarrow{\\mathrm{r}}_{1}\\right) \\\\\\mathrm{W} & =(4 \\hat{\\mathrm{i}}+3 \\hat{\\mathrm{j}}) \\cdot(4 \\hat{\\mathrm{j}}+3 \\hat{\\mathrm{k}}+2 \\hat{\\mathrm{i}}-5 \\hat{\\mathrm{j}}) \\\\& =(4 \\hat{\\mathrm{i}}+3 \\hat{j}) \\cdot(2 \\hat{\\mathrm{i}}-\\hat{\\mathrm{j}}+3 \\hat{\\mathrm{k}})=8+(-3)=5 \\mathrm{~J}\\end{aligned}\\]",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5d8",
      },
      QID: "P0100031",
      QStart: "P0100031",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A block of mass $m$ is kept on a platform which starts from rest with constant acceleration $\\mathrm{g} / 2$ upward, as shown in figure. Work done by normal reaction on block in time $t$ is:\\\\\\includegraphics[max width=\\textwidth, center]{2024_12_17_c1529514b5b0ebdc2e39g-1}",
      OptionsEnglish:
        "\\\\(1) $-\\frac{\\mathrm{mg}^{2} \\mathrm{t}^{2}}{8}$\\\\(2) $\\frac{\\mathrm{mg}^{2} \\mathrm{t}^{2}}{8}$\\\\(3) 0\\\\(4) $\\frac{3 \\mathrm{mg}^{2} \\mathrm{t}^{2}}{8}$",
      Hindi: "\\\\",
      OptionsHindi: "",
      Gujarati:
        "\\\\આકૃતિમાં દર્શાવ્યા પ્રમાડે $m$ દળનો બ્લોક પ્લેટફોર્મ પર મુકેલ છે. જે સ્થિર સ્થિતિમાંથી અચળ પ્રવેગ $\\mathrm{g} / 2$ વડે ઉપર તરફ ગતિ કરે છે. $t$ સમયે બ્લોક પર લંબબળ વડે થતું કાર્ય\\\\\\includegraphics[max width=\\textwidth, center]{2024_12_17_c1529514b5b0ebdc2e39g-2}",
      OptionsGajarati:
        "\\\\(1) $-\\frac{\\mathrm{mg}^{2} \\mathrm{t}^{2}}{8}$\\\\(2) $\\frac{\\mathrm{mg}^{2} \\mathrm{t}^{2}}{8}$\\\\(3) 0\\\\(4) $\\frac{3 \\mathrm{mg}^{2} \\mathrm{t}^{2}}{8}$",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "4",
      SolutionSteps:
        "W = F s cos = m\n2\ng\n1\ng\ng\nt\n2\n2\n2\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
      SolutionVideo: "",
      QEnd: "P0100031",
      Images: {
        "2024_12_17_c1529514b5b0ebdc2e39g-1":
          "/9j/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIAPICbQMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APf6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiimknPv9aAHUUi8iloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvL9d/5OF8Nf9g1/wD0G4r1CvL9d/5OF8Nf9g1//QbigD1CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK8v13/AJOF8Nf9g1//AEG4r1CvL9d/5OF8Nf8AYNf/ANBuKAPUKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKQ9aWkx1oA8u1340Wmh65e6W2jzzNaymJpBMFDY46YNUP+F+2I4OgXOe/wDpC/4VZ8C/8lk8Y/8AAv8A0MV6xQB49/wv2x/6AFx/4EL/AIUf8L9sf+gBcf8AgQv+Few0UAePf8L9sf8AoAXH/gQv+FH/AAv2x/6AFx/4EL/hXsNFAHj3/C/bH/oAXH/gQv8AhR/wv2x/6AFx/wCBC/4V7DRQB49/wv2x/wCgBcf+BC/4Uf8AC/bH/oAXH/gQv+Few0UAePf8L9sf+gBcf+BC/wCFH/C/bH/oAXH/AIEL/hXsNFAHj3/C/bH/AKAFx/4EL/hR/wAL9sf+gBcf+BC/4V7DRQB46fj7ZHpoNx/4EL/8TXSeCfidb+NNal06HTZbVo7dpy7yhgQGVcYH+9XekZ4PSvBPg1z8StYzzmzn/wDR0dAHvY6c0tIOgpaACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAry/Xf+ThfDX/YNf/0G4r0q5uI7W3luJpFjhiQu7scBVAySa+Y9e+IF9ffEJPE1mQv2RglojDrEpPB/3wzZ9N3HagD6iorL0DXrTxHolvqli26KZclc8ow6qfcHitQdKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPJ/Av/ACWTxj/wP/0Na9Y7V5P4F/5LJ4x/4H/6GtesdqACiiigAooooAKKKKACiiigAooooAKKKKAENeB/Bn/kpWr/APXnN/6Ojr3w14H8Gf8AkpWr/wDXnN/6OjoA98HQUtIOgpaACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDyT4t+Ibu9u7XwToytJeXzKZ9pxwT8qZ7A/eY9AAOxNcpfeBtN074j+HfDMqmWGaxX7U6naZJD5uWHp04Hoo9DXvMumWUuqw6k9tE17DG0Uc5Ub1U4JAP8AnqfU15d4n5+P/hzj/l1X+ctAHP8Ag3Vb34a+PLjwzqzFrC5mCb8cBjxHKB2BGAR/8TXvo6Vm3eh6Zeata6pc2MM15aqVgldclM88e4IyD2ycVpL0/wDrUALRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHk/gX/AJLJ4x/4H/6Gtesdq8n8C/8AJZPGP/A//Q1r1jtQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAhrwP4M/8lK1f/rzm/8AR0de+GvA/gz/AMlK1f8A685v/R0dAHvg6ClpB0FLQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFeXa8qn9oTw0CoI/s5z07hbjH8hXqNeX67/ycL4a/7Br/APoNxQB6hR0oooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA8n8C/8lk8Y/8AA/8A0Na9Y7V5P4F/5LJ4x/4H/wChrXrHagAooooAKKKKACiiigAooooAKKKKACiiigBDXgfwZ/5KVq//AF5zf+jo698NeB/Bn/kpWr/9ec3/AKOjoA98HQUtIOgpaACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAry/Xf+ThfDX/AGDX/wDQbivUK8v13/k4Xw1/2DX/APQbigD1CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACobmSaKB3gi86UDKRl9u4+mamooA4LTPiNcazDerp3hjULm7tJjC8SSpsDDrlyQB096j0r4mPfahd6Xc+G9Sg1i25+wx4kLL67jtA6g8+vGao/CHm48V/wDY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UYCqBgAfgKc7pEhZ2CIoySTgACvMv+FYeKP+ilav+Uv/AMeqOf4U+IrqCSC4+IuqSwyKVeOSORlYHqCDNyKAMqzjf4sfEBr6YM3hnSDtjRhxOT2/4FgE+i7R3zXtCgbRgcV5PY/B7WtMt/s+n+Pr+0h3FvLt4XjXPrgS4zVn/hWHij/opWr/APfMv/x6gD0e+vLfTrGe9u5RFbW6GSRycBVAyTXk3g+xuPiH40uPGerRMNNtH8vT4HHGQfl/Lkn1Y+xFW7v4R67qFs1te/EHUbmB8FopopHU4ORkGbHBGaLT4R69YWyW1n8QdRt4EzsihikRVz6ATYFAHqy42jilry//AIVh4o/6KVq/5S//AB6j/hWHij/opWr/AJS//HqAPUK8n/5uN/7c/wD2lVj/AIVh4o/6KVq/5S//AB6rfhv4Z3mh+K49fvvEs+q3CRtGfPgIZgVx98yE8UAei0Ug6UtABXl+u/8AJwvhr/sGv/6DcV6hXA6t4e1a5+Mui69Da7tMtbJopZvMUbXIm4253fxr0HegDvqKRenNLQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUYoooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKMA9aKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q==",
        "2024_12_17_c1529514b5b0ebdc2e39g-2":
          "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",
      },
      "KSolutionSteps:":
        "\\[\\mathrm{W}=\\mathrm{Fs} \\cos \\theta=\\mathrm{m}\\left(\\mathrm{~g}+\\frac{\\mathrm{g}}{2}\\right) \\times\\left[\\frac{1}{2} \\times \\frac{\\mathrm{g}}{2} \\times \\mathrm{t}^{2}\\right]\\]",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5d9",
      },
      QID: "P0100081",
      QStart: "P0100081",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\You lift a suitcase from the floor and keep it on a table. The work done by you on the suitcase does depends on\\\\",
      OptionsEnglish:
        "\\\\(1) the path taken by the suitcase\\\\(2) the time taken by you in doing so\\\\(3) the weight of the suitcase\\\\(4) your weight.",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "3",
      SolutionSteps:
        "Wagent + WG = K = 0\nWagent = – WG, But WG is independent of the path joining initial and final position. WG is\nindependent of time taken.",
      SolutionVideo: "",
      QEnd: "P0100081",
      "KSolutionSteps:":
        "\\\\$\\mathrm{W}_{\\text {agent }}+\\mathrm{W}_{\\mathrm{G}}=\\Delta \\mathrm{K}=0$\\\\$\\mathrm{W}_{\\text {agent }}=-\\mathrm{W}_{\\mathrm{G}}$, But $\\mathrm{W}_{\\mathrm{G}}$ is independent of the path joining initial and final position. $\\mathrm{W}_{\\mathrm{G}}$ is independent of time taken.\\\\",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5da",
      },
      QID: "P0100333",
      QStart: "P0100333",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A body moves a distance of 10 m along a straight line under the action of a force of 5 N . If the work done is 25 joules, the angle which the force makes with the direction of motion of the body is\\\\",
      OptionsEnglish:
        "\\\\(1) $0^{\\circ}$\\\\(2) $30^{\\circ}$\\\\(3) $60^{\\circ}$\\\\(4) $90^{\\circ}$",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "3",
      SolutionSteps: "W = Fd cos \n25 = 5 × 10 cos \n= 60°",
      SolutionVideo: "",
      QEnd: "P0100333",
      "KSolutionSteps:":
        "\\\\$\\mathrm{W}=\\mathrm{Fd} \\cos \\theta$\\\\$25=5 \\times 10 \\cos \\theta$\\\\$\\theta=60^{\\circ}$\\\\",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5db",
      },
      QID: "P0100344",
      QStart: "P0100344",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A body of mass 10 kg is dropped to the ground from a height of 10 metres. The work done by the gravitational force is ( $\\mathrm{g}=9.8 \\mathrm{~m} / \\mathrm{s}^{2}$ )\\\\",
      OptionsEnglish:
        "\\\\(1) - 490 joules\\\\(2) +490 joules\\\\(3) -980 joules\\\\(4) +980 joules",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "4",
      SolutionSteps: "Work = mgh = 10 × 9.8 ×10\n= 980 J",
      SolutionVideo: "",
      QEnd: "P0100344",
      "KSolutionSteps:":
        "\\[\\begin{aligned}\\text { Work } & =\\mathrm{mgh}=10 \\times 9.8 \\times 10 \\\\& =980 \\mathrm{~J}\\end{aligned}\\]",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5dc",
      },
      QID: "P0100537",
      QStart: "P0100537",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A block 'A' of mass 45 kg is placed on a block 'B' of mass 123 kg . Now block ' B ' is displaced by external agent by 50 cm horizontally towards right. During the same time block 'A' just reaches to the left end of block B. Initial \\& final position are shown in figure. Refer to the figure \\& find the workdone by frictional force on block A in ground frame during above time.\\\\\\includegraphics[max width=\\textwidth, center]{2024_12_17_bedf7a9fd700dc4507dfg-1}",
      OptionsEnglish: "\\\\(1) - 18 Nm\\\\(2) 18 Nm\\\\(3) 36 Nm\\\\(4) -36 Nm",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati: "\\\\",
      OptionsGajarati: "",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "2",
      SolutionSteps:
        "Displacement of A w.r.t. ground = 20 cm towards right\nfriction force on A = 0.2 × 45 × 10 = 90 N. towards right\nWfr = 90 × 100\n20 = 18 Nm.",
      SolutionVideo: "",
      QEnd: "P0100537",
      Images: {
        "2024_12_17_bedf7a9fd700dc4507dfg-1":
          "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S2eOMAmu0wDRgCgDhPCfw9ufCviPVNXj137S2qzGa8ie0Ch23M2VIbK4Ln1p2ufDe1vfFCeJ9H1K40bXACHuYkEiS8bfnjbg8ccEZ+vNd1gUYFAHG2ngY3HiC01/xHqb6xqFkpFovkiCCAnqyxgklvdie3oMVPGnw9n8Y6rp15NrrWkenSebawx2wbDfKcsS3zcqOwx+Nd5gUYGc0Acj4v8AB994x8Nrol1rQt4XKm5eK0BaYqwK4y3yjIz3+vatbwxpFzoGhWmk3F8LxLSFIYZBCIyERQoBGTk8da2cUgAHSgBaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooACARzSYFLRQAYooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKQnHSloIzQA0HnrS18+fGbT4ta+MPhfSLlnW3vIIIZGjwHAed1JBIPOP5V0Y/Zz8IH/mI64P+28P/wAboA9gzRmvIP8AhnHwf/0Etc/7/wAP/wAao/4Zx8H/APQS1z/v/D/8aoA9fzRmvIP+GcfB/wD0Etc/7/w//GqP+GcfB/8A0Etc/wC/8P8A8aoA9fzRmvIP+GcfB/8A0Etc/wC/8P8A8ao/4Zx8H/8AQS1z/v8Aw/8AxqgD1/NGa8g/4Zx8H/8AQS1z/v8Aw/8Axqj/AIZx8H/9BLXP+/8AD/8AGqAPX80EkCvIP+GcfB//AEEtc/7/AMP/AMaoP7OfhAdNR1s/9t4v/jVAHr4Palrx/wDZy/5J/f8A/YUk/wDRUVewUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHg3xO/wCS/wDgj/t1/wDSh694FeEfE7/kv/gj/t1/9KHr3cUALRRRQAVFc3EVrbSXE0ixxRKX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/o5K9CwBjFcx418InxppP9kz6ncWlk7K0qQIu6TacgEtnjPOPYUAct4X8LeIrz4f6LbJ4xuLfTrmwgcxrZJ9ojRowTHHLn5RzgEqSAK7rQ/D+neH9Ag0SwgxZQoU2t82/OdxY9ySTn60vhzR30DQrTSmvJLuO0jWGKSRFVhGoAVTtwDgDr3rVwM5xQB55p/w1uPC+oXU3hHxFLpVpdSCSWxmtVuYsgY+XJDKefXtzkCt3w14MsfDVxe3yzT32rX7bru/ucGSTvgAYCqM9AB0HoMdMQD1FGBjGOKAODs/BfiLSJr86R4yaCC8uZrjyLjTkmSIyOzfJ8wIxkd8Zycc1q+G/Blv4Ws9RNheSzalqMpnub67UO0khzyVXaMAlsAetdPgHrRgUAcN4S8A3HhTxBquqx659pOrTGe8ie1C7ny7Dad3y4Mh9apeIfhYdY8bt4ms/EV9pU80YiuFtFCyOu3aQr5G0kAckHpXo20DtRgDtQBwnjP4cjxjoljoraq9np1kVdEWHzZGdVKhi7Nk8Nzxyc81vXnhyHXPC7aHr7rqEciBZZFj8ktg5DAAnaRxW7gelLgCgDz7Tfh/rekaYdFsPG13Ho2zYkTWcbXESHOQk2RjrgZU4HTFdFpPhm28NeGk0bw8VsgmSkskZmO4n5mbkbifqMcdhit/FJgelAHD+A/Adx4Et57W31pry0nkM0kc1sFbzCoBIbd04HHNVtM+HV7p/jy68XDxGZr+7Ty50Nkuwx/KAoAbjhFGeeleg7RnOKXAoAQHPv8ASloooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigApMD0paKADAzmiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//9k=",
      },
      "KSolutionSteps:":
        "\\\\Displacement of A w.r.t. ground $=20 \\mathrm{~cm}$ towards right\\\\friction force on $\\mathrm{A}=0.2 \\times 45 \\times 10=90 \\mathrm{~N}$. towards right\\[\\mathrm{W}_{\\mathrm{fr}}=90 \\times \\frac{20}{100}=18 \\mathrm{Nm}\\]",
      Status: "UNCHECKED",
    },

    {
      _id: {
        $oid: "67b2d480766c70208d83e5df",
      },
      QID: "P0100563",
      QStart: "P0100563",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A man pushes an $80-\\mathrm{N}$ crate a distance of 5.0 m upward along a frictionless slope that makes an angle of $30^{\\circ}$. with the horizontal. The force he exerts is parallel to the slope. If the speed of the crate is constant, then the work done by the man is:\\\\",
      OptionsEnglish: "\\\\(1) 20 J\\\\(2) 61 J\\\\(3) 140 J\\\\(4) 200 J",
      Hindi:
        "\\\\एक आदमी $80-\\mathrm{N}$ भार के एक गुटके को $30^{\\circ}$ आनत कोण एक घर्षण रहित सतह पर उपर की ओर ढकेलता है। आदमी द्वारा लगाया गया बल तल के समानान्तर है। यदि गुटके की चाल नियत हो तो आदमी द्वारा किया गया कार्य-\\\\",
      OptionsHindi: "\\\\(1) 20 J\\\\(2) 61 J\\\\(3) 140 J\\\\(4) 200 J",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "4",
      SolutionSteps: "",
      SolutionVideo: "",
      QEnd: "P0100563",
      "KSolutionSteps:": "\\\\",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5e0",
      },
      QID: "P0100566",
      QStart: "P0100566",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A 0.50-kg object moves in a horizontal circular track with a radius of 2.5 m . An external force of 3.0 N , always tangent to the track, causes the object to speed up as it goes around. The work done by the external force as the mass makes one revolution is:\\\\",
      OptionsEnglish: "\\\\(1) 24 J\\\\(2) 47 J\\\\(3) 59 J\\\\(4) 94 J",
      Hindi:
        "\\\\$0.50-\\mathrm{kg}$ का एक पिण्ड 2.5 m त्रिज्या के एक क्षैतिज वृताकार पथ पर गतिशील है। स्पर्शी दिशा में एक बाहृय बल 3.0 N पिण्ड की चाल अनवरत बढ़ाता है। पिण्ड के एक पूर्ण चक्कर के बाहृय बल द्वारा किया गया कार्य'",
      OptionsHindi: "\\\\(1) 24 J\\\\(2) 47 J\\\\(3) 59 J\\\\(4) 94 J",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "2",
      SolutionSteps: "",
      SolutionVideo: "",
      QEnd: "P0100566",
      "KSolutionSteps:": "\\\\",
      Status: "UNCHECKED",
    },

    {
      _id: {
        $oid: "67b2d480766c70208d83e5e2",
      },
      QID: "P0100622",
      QStart: "P0100622",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A particle is displaced from a position $2 \\hat{i}-\\hat{j}+\\hat{k}(\\mathrm{~m})$ to another position $3 \\hat{i}+2 \\hat{j}-2 \\hat{k}(m)$\\\\under the action of a force $2 \\hat{i}+\\hat{j}-\\hat{k}(N)$. The work done by the force is:\\\\",
      OptionsEnglish: "\\\\(1) 8 J\\\\(2) 10 J\\\\(3) 12 J\\\\(4) 36 J",
      Hindi:
        "\\\\एक कण एक बल $2 \\hat{i}+\\hat{j}-\\hat{k}(N)$ के प्रभाव में एक स्थिति $2 \\hat{i}-\\hat{j}+\\hat{k}(m)$ से दूसरी स्थिति $3 \\hat{i}+2 \\hat{j}-2 \\hat{k}(m)$ तक विस्थापित होती है। बल द्वारा किया गया कार्य है :\\\\",
      OptionsHindi: "\\\\(1) 8 J\\\\(2) 10 J\\\\(3) 12 J\\\\(4) 36 J",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "1",
      SolutionSteps:
        "kˆ\n2\njˆ\n2\niˆ\n3\nr2\n\n\n\n\n,\nkˆ\njˆ\niˆ\n2\nr1\n\n\n\n\nDisp =\n1\n2\nv\nv\n\n\n=\nkˆ\n3\njˆ\n3\niˆ\n\n\nW = F.ds =\n)\nkˆ\njˆ\niˆ\n2\n(\n\n\n.\n)\nkˆ\n3\njˆ\n3\niˆ(\n\n\n= (2 + 3 + 3) = 8",
      SolutionVideo: "",
      QEnd: "P0100622",
      "KSolutionSteps:":
        "\\[\\begin{aligned}& \\vec{r}_{2}=3 \\hat{i}+2 \\hat{j}-2 \\hat{k}, \\vec{r}_{1}=2 \\hat{i}-\\hat{j}+\\hat{k} \\\\& \\text { Disp }=\\vec{v}_{2}-\\vec{v}_{1}=\\hat{i}+3 \\hat{j}-3 \\hat{k} \\\\& W=F \\cdot d s=(2 \\hat{i}+\\hat{j}-\\hat{k}) \\cdot(\\hat{i}+3 \\hat{j}-3 \\hat{k})=(2+3+3)=8\\end{aligned}\\]",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5e3",
      },
      QID: "P0100661",
      QStart: "P0100661",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A ball is released from the top of a tower. The ratio of work done by force of gravity\\\\in first, second and third second of the motion of ball is in the ratio\\\\",
      OptionsEnglish:
        "\\\\(1) $1: 2: 3$\\\\(2) $1: 4: 16$\\\\(3) $1: 3: 5$\\\\(4) $1: 9: 25$",
      Hindi:
        "\\\\एक गेंद को एक ईमारत के शीर्ष से छोड़ा जाता है। गेंद की गति के प्रथम, द्वितीय व तृतीय सैकण्ड में गुरूत्वीय बल द्वारा किये गये कार्य का अनुपात है:\\\\",
      OptionsHindi:
        "\\\\(1) $1: 2: 3$\\\\(2) $1: 4: 16$\\\\(3) $1: 3: 5$\\\\(4) $1: 9: 25$",
      Gujarati: "\\\\",
      OptionsGajarati: "",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "3",
      SolutionSteps:
        "w = mgs\nSn = 2\n1 a (2n – 1)\nS1 =\ng\n2\n1 (2 × 1 – 1) = 2\ng\nS2 = 2\n1 g (2 × 2 – 1) =\n2\ng\n3\nS3 = 2\n1 g (2 × 3 – 1) =\n2\ng\n5",
      SolutionVideo: "",
      QEnd: "P0100661",
      "KSolutionSteps:":
        "\\[\\begin{aligned}& \\mathrm{w}=\\mathrm{mgs} \\\\& \\mathrm{~S}_{\\mathrm{n}}=\\frac{1}{2} \\mathrm{a}(2 \\mathrm{n}-1) \\\\& \\mathrm{S}_{1}=\\frac{1}{2} \\mathrm{~g}(2 \\times 1-1)=\\frac{\\mathrm{g}}{2} \\\\& \\mathrm{~S}_{2}=\\frac{1}{2} \\mathrm{~g}(2 \\times 2-1)=\\frac{3 \\mathrm{~g}}{2} \\\\& \\mathrm{~S}_{3}=\\frac{1}{2} \\mathrm{~g}(2 \\times 3-1)=\\frac{5 \\mathrm{~g}}{2}\\end{aligned}\\]",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5e4",
      },
      QID: "P0100702",
      QStart: "P0100702",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\The displacement of a body of mass 2 kg varies with time t as $\\mathrm{x}=\\mathrm{t}^{2}+2 \\mathrm{t}$, where x is in meters and $t$ is in seconds. The work done by all the forces acting on the body during the time interval [2s, 4 s ] is\\\\",
      OptionsEnglish: "\\\\(1) 36 J\\\\(2) 64 J\\\\(3) 100 J\\\\(4) 120 J",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "2",
      SolutionSteps:
        "dt\ndx = 2t + 2\nWnet = 2\n1 m ((Vat 4s)2 – (Vat 2s))\n= 2\n1 × 2 [102 – 62] = 4 × 16 = 64 J",
      SolutionVideo: "",
      QEnd: "P0100702",
      "KSolutionSteps:":
        "\\[\\begin{aligned}& \\frac{\\mathrm{dx}}{\\mathrm{dt}}=2 \\mathrm{t}+2 \\\\& \\mathrm{~W}_{\\mathrm{net}}=\\frac{1}{2} \\mathrm{~m}\\left(\\left(\\mathrm{~V}_{\\mathrm{at} 4 \\mathrm{~s}}\\right)^{2}-\\left(\\mathrm{V}_{\\mathrm{at} 2 \\mathrm{~s}}\\right)\\right) \\\\& =\\frac{1}{2} \\times 2\\left[10^{2}-6^{2}\\right]=4 \\times 16=64 \\mathrm{~J}\\end{aligned}\\]",
      Status: "UNCHECKED",
    },

    {
      _id: {
        $oid: "67b2d480766c70208d83e5e6",
      },
      QID: "P0100279",
      QStart: "P0100279",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\In which one of the following situations is zero net work done?\\\\",
      OptionsEnglish:
        "\\\\(1) A ball rolls down an inclined plane.\\\\(2) A physics student stretches a spring.\\\\(3) A projectile falls toward the surface of Earth.\\\\(4) A box is pulled across a rough floor at constant velocity.",
      Hindi:
        "\\\\निम्न में से किस एक स्थिति में किया गया कुल कार्य शून्य है?\\\\",
      OptionsHindi:
        "\\\\(1) एक गेंद एक आनत तल पर लुढ़कती है\\\\(2) एक भौतिकी छात्र एक स्प्रिंग को खींचता है\\\\(3) एक प्रक्षेप्य पृथ्वी की सतह की ओर गिरता है\\\\(4) एक बॉक्स नियत वेग से एक खुरदरे फर्श पर खींचा जाता है",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "4",
      SolutionSteps: "Work = change in K.E\nK.E = 0 as speed is constant.",
      SolutionVideo: "",
      QEnd: "P0100279",
      "KSolutionSteps:":
        "\\\\Work = change in K.E\\\\$\\Delta \\mathrm{K} . \\mathrm{E}=0$ as speed is constant.\\\\",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5e7",
      },
      QID: "P0100280",
      QStart: "P0100280",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A $5.00-\\mathrm{kg}$ block of ice is sliding across a frozen pond at $2.00 \\mathrm{~m} / \\mathrm{s}$. A $7.60-\\mathrm{N}$ force is applied in the direction of motion. After the ice block slides 15.0 m , the force is removed. The work done by the applied force is\\\\",
      OptionsEnglish:
        "\\\\(1) -114 J\\\\(2) -735 J\\\\(3) +114 J .\\\\(4) +735 J.",
      Hindi:
        "\\\\एक $5.00-\\mathrm{kg}$ बर्फ का ब्लॉक एक जमे हुये तालाब पर $2.00 \\mathrm{~m} / \\mathrm{s}$ से फिसल रहा है। एक $7.60-\\mathrm{N}$ बल गति की दिशा में आरोपित है। बर्फ के ब्लॉक के 15.0 m फिसलने के पश्चात् बल हटा लिया जाता है। आरोपित बल द्वारा किया गया कार्य है:\\\\",
      OptionsHindi:
        "\\\\(1) -114 J\\\\(2) -735 J\\\\(3) +114 J .\\\\(4) +735 J .",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "3",
      SolutionSteps: "Work = Fd cos \n= 7.6 × 15 = 114 J",
      SolutionVideo: "",
      QEnd: "P0100280",
      "KSolutionSteps:":
        "\\\\Work $=\\mathrm{Fd} \\cos \\theta$\\[=7.6 \\times 15=114 \\mathrm{~J}\\]",
      Status: "UNCHECKED",
    },

    {
      _id: {
        $oid: "67b2d480766c70208d83e5e9",
      },
      QID: "P0100282",
      QStart: "P0100282",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\Mohan carries an 8.0-kg suitcase as she walks 25 m along a horizontal walkway to his room at a constant speed of $1.5 \\mathrm{~m} / \\mathrm{s}$. How much work does Mohan do in carrying her suitcase?\\\\",
      OptionsEnglish:
        "\\\\(1) zero joules\\\\(2) 200 J\\\\(3) 2000 J\\\\(4) 40 J",
      Hindi:
        "\\\\मोहन $8.0-\\mathrm{kg}$ सूटकेस पकड़े हुये है तथा वह इसे लेकर एक क्षैतिज रास्ते पर $1.5 \\mathrm{~m} / \\mathrm{s}$ की नियत चाल से चलते\\\\हुये 25 m दूर रिथत अपने कक्ष तक जाता है। मोहन अपने सूटकेस को ले जाने में कितना कार्य करती है?\\\\",
      OptionsHindi:
        "\\\\(1) zero joules\\\\(2) 200 J\\\\(3) 2000 J\\\\(4) 40 J",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "1",
      SolutionSteps:
        "Force on bag is invertical and bag is moving along horizontal hence work done is equal\nto zero.",
      SolutionVideo: "",
      QEnd: "P0100282",
      "KSolutionSteps:":
        "\\\\Force on bag is invertical and bag is moving along horizontal hence work done is equal to zero.\\\\",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5ea",
      },
      QID: "P0100294",
      QStart: "P0100294",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A body, constrained to move in the Y-direction is subjected to a force given by $\\overrightarrow{\\mathrm{F}}=(2 \\hat{\\mathrm{i}}+15 \\hat{\\mathrm{j}}+6 \\hat{\\mathrm{k}}) \\mathrm{N}$. What is the work done by this force in moving the body a distance 10 m along the Y-axis :\\\\",
      OptionsEnglish: "\\\\(1) 20 J\\\\(2) 150 J\\\\(3) 160 J\\\\(4) 190 J",
      Hindi:
        "\\\\Y -दिशा में गति करने को बाध्य एक वस्तु पर लगने वाला बल $\\overrightarrow{\\mathrm{F}}=(2 \\hat{i}+15 \\hat{\\mathrm{j}}+6 \\hat{\\mathrm{k}}) \\mathrm{N}$ द्वारा दिया जाता है। वस्तु\\\\को Y -अक्ष के अनुदिश 10 m दूरी चलाने में इस बल द्वारा किया गया कार्य क्या है ?\\\\",
      OptionsHindi: "\\\\(1) 20 J\\\\(2) 150 J\\\\(3) 160 J\\\\(4) 190 J",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "2",
      SolutionSteps:
        "S.F\nW\n\n\n\n)jˆ\n10\n).(\nkˆ\n6\njˆ\n15\niˆ\n2\n(\nW\n\n\n\nW = 150 joule",
      SolutionVideo: "",
      QEnd: "P0100294",
      "KSolutionSteps:":
        "\\[\\begin{aligned}& \\mathrm{W}=\\overrightarrow{\\mathrm{F}} \\overrightarrow{\\mathrm{~S}} \\\\& \\mathrm{~W}=(2 \\hat{\\mathrm{i}}+15 \\hat{\\mathbf{j}}+6 \\hat{\\mathbf{k}}) \\cdot(10 \\hat{\\mathrm{j}}) \\quad \\mathrm{W}=150 \\text { joule }\\end{aligned}\\]",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5eb",
      },
      QID: "P0100297",
      QStart: "P0100297",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\The work done by the centripetal force F when the body completes one rotation around the circle of radius R is :\\\\",
      OptionsEnglish:
        "\\\\(1) $2 \\pi \\mathrm{RF}$\\\\(2) 2 RF\\\\(3) RF\\\\(4) zero",
      Hindi:
        "\\\\जब एक पिण्ड R त्रिज्या के वृत्त के चारों ओर एक घूर्णन पूर्ण करता है तो अभिकेन्द्रीय बल F द्वारा किया गया कार्य है:\\\\",
      OptionsHindi:
        "\\\\(1) $2 \\pi \\mathrm{RF}$\\\\(2) 2 RF\\\\(3) $R F$\\\\(4) शून्य",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "4",
      SolutionSteps: "Force displacement",
      SolutionVideo: "",
      QEnd: "P0100297",
      "KSolutionSteps:": "\\\\Force $\\perp$ displacement\\\\",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5ec",
      },
      QID: "P0100298",
      QStart: "P0100298",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A gardener pushes a lawn roller through a distance 20 m . If he applies a force of 20 kg -wt in a direction inclined at $60^{\\circ}$ to the ground, the work done by him is :\\\\",
      OptionsEnglish: "\\\\(1) 1960 J\\\\(2) 196 J\\\\(3) 1.96 J\\\\(4) 196 kJ",
      Hindi:
        "\\\\एक माली (gardener) एक मैदानी रोलर (lawn roller) को 20 m दूरी तक धकेलता है। यदि वह 20 kg wt का एक बल धरातल से $60^{\\circ}$ के आनत कोण की दिशा में लगाता है, तो उसके द्वारा किया गया कार्य है:\\\\",
      OptionsHindi: "\\\\(1) 1960 J\\\\(2) 196 J\\\\(3) 1.96 J\\\\(4) 196 kJ",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "1",
      SolutionSteps:
        "Given,\nF = 20 kg-wt = 20 × 9.8 N\n= 60° and s = 20 m\nWork done = F s cos\n= 20 × 9.8 × 20 × cos60° = 1960 J",
      SolutionVideo: "",
      QEnd: "P0100298",
      "KSolutionSteps:":
        "\\\\Given, $F=20 \\mathrm{~kg}-\\mathrm{wt}=20 \\times 9.8 \\mathrm{~N}$\\\\$\\theta=60^{\\circ}$ and $\\mathrm{s}=20 \\mathrm{~m}$\\\\Work done $=\\mathrm{Fs} \\cos \\theta$\\\\$=20 \\times 9.8 \\times 20 \\times \\cos 60^{\\circ}=1960 \\mathrm{~J}$\\\\",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d480766c70208d83e5ed",
      },
      QID: "P0100307",
      QStart: "P0100307",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A deliveryman moves 10 cartons from the sidewalk, along a 10-meter ramp to a loading dock, which is 1.5 meters above the sidewalk. If each carton has a mass of 25 kg , what is the total work done by the deliveryman on the cartons to move them to the loading dock?\\\\\\includegraphics[max width=\\textwidth, center]{2024_12_17_8f162a5be786038efbdeg-1}",
      OptionsEnglish:
        "\\\\(1) 2500 J\\\\(2) 3750 J\\\\(3) 10000 J\\\\(4) 25000 J",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "2",
      SolutionSteps:
        "Computation of the work is W = N (Fd) = (10 cartons) (mgd) = (10) (25 kg) (10 m/s2)\n(1.5m) = 3750 J",
      SolutionVideo: "",
      QEnd: "P0100307",
      Images: {
        "2024_12_17_8f162a5be786038efbdeg-1":
          "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",
      },
      "KSolutionSteps:":
        "\\\\Computation of the work is $\\mathrm{W}=\\mathrm{N}(\\mathrm{Fd})=(10$ cartons $)(\\mathrm{mgd})=(10)(25 \\mathrm{~kg})\\left(10 \\mathrm{~m} / \\mathrm{s}^{2}\\right)$ $(1.5 \\mathrm{~m})=3750 \\mathrm{~J}$\\\\",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d481766c70208d83e5ee",
      },
      QID: "P0100315",
      QStart: "P0100315",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A force $\\vec{F}=3 \\hat{i}+\\hat{j}+2 \\hat{k}$ acting on a particle causes a displacement $\\vec{S}=-4 \\hat{i}+2 \\hat{j}-3 \\hat{k}$ in\\\\its own direction. If the work done is 6 J , then the value of c will be\\\\",
      OptionsEnglish: "\\\\(1) 12\\\\(2) 6\\\\(3) 1\\\\(4) 0",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "1",
      SolutionSteps:
        "S\n·\nF\nW\n\n\n\n=\n)\nkˆ\n2\njˆc\niˆ\n3\n(\n\n\n,\n)\nkˆ\n3\njˆ\n2\niˆ\n4\n(\n\n\n\n= – 12 + 2c – 6\nWork done = 6 J (Given)\n– 12 + 2 c – 6 = 6 c = 12",
      SolutionVideo: "",
      QEnd: "P0100315",
      "KSolutionSteps:":
        "\\[\\begin{aligned}& \\mathrm{W}=\\overrightarrow{\\mathrm{F}} \\cdot \\overrightarrow{\\mathrm{~S}}=(3 \\hat{\\mathrm{i}}+\\mathrm{c} \\hat{\\mathrm{j}}+2 \\hat{\\mathrm{k}}), \\\\& (-4 \\hat{\\mathrm{i}}+2 \\hat{\\mathrm{j}}-3 \\hat{\\mathrm{k}})=-12+2 \\mathrm{c}-6 \\\\& \\text { Work done }=6 \\mathrm{~J}(\\text { Given }) \\\\& \\therefore-12+2 \\mathrm{c}-6=6 \\Rightarrow \\mathrm{c}=12\\end{aligned}\\]",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67b2d481766c70208d83e5ef",
      },
      QID: "P0100326",
      QStart: "P0100326",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Power and Energy",
      Topic: "Work done by constant force",
      Difficulty: "Low",
      AppearedIn: "",
      English: "\\\\Choose the incorrect statement\\\\",
      OptionsEnglish:
        "\\\\(1) No work is done if the displacement is perpendicular to the direction of the applied force\\\\(2) If the angle between the force and displacement vectors is obtuse, then the work done is negative\\\\(3) Frictional force is non-conservative\\\\(4) All the central forces are non-conservative",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati: "\\\\",
      OptionsGajarati: "\\\\",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "4",
      SolutionSteps: "All centred forces are conservative.",
      SolutionVideo: "",
      QEnd: "P0100326",
      "KSolutionSteps:": "\\\\All centred forces are conservative.\\\\",
      Status: "UNCHECKED",
    },
    {
      _id: {
        $oid: "67c7e092fc112f5ad700168f",
      },
      QID: "P0100048",
      QStart: "P0100048",
      Class: "11",
      Subject: "Physics",
      Type: "SCQ",
      Chapter: "Work, Energy and Power",
      Topic: "Work done by variable force",
      Difficulty: "Low",
      AppearedIn: "",
      English:
        "\\\\A particle moves under the effect of a force $F=C x$ from $x=0$ to $x=x_{1}$. The work done in the process is\\\\",
      OptionsEnglish:
        "\\\\(1) $\\mathrm{Cx}_{1}^{2}$\\\\(2) $\\frac{1}{2} \\mathrm{Cx}_{1}^{2}$\\\\(3) $\\mathrm{Cx}_{1}$\\\\(4) Zero",
      Hindi: "\\\\",
      OptionsHindi: "\\\\",
      Gujarati:
        "\\\\બળ $\\mathrm{F}=\\mathrm{Cx}$ ની અસર હેઠળ કણ $\\mathrm{x}=0$ થી $\\mathrm{x}=\\mathrm{x}_{1}$ જેટલું ખસે છે. પ્રક્રિયા દરમ્યાન થતું કાર્ય એ\\\\",
      OptionsGajarati:
        "\\\\(1) $\\mathrm{Cx}_{1}^{2}$\\\\(2) $\\frac{1}{2} \\mathrm{Cx}_{1}^{2}$\\\\(3) $\\mathrm{Cx}_{1}$\\\\(4) Zero",
      NoOfOptions: "4",
      Options: "1&2&3&4",
      Answer: "2",
      SolutionSteps:
        "1\n1\n1\nx\nx\nx\n2\n2\n1\n0\n0\n0\nx\n1\nW F.dx\nCxdx\nC\nCx\n2\n2\n\n\n\n\n\n\n\n\n\n\n",
      SolutionVideo: "",
      QEnd: "P0100048",
      "KSolutionSteps:":
        "\\[\\mathrm{W} \\int_{0}^{x_{1}} \\mathrm{~F} . \\mathrm{dx}=\\int_{0}^{x_{1}} \\mathrm{Cxdx}=\\mathrm{C}\\left[\\frac{\\mathrm{x}^{2}}{2}\\right]_{0}^{\\mathrm{x}_{1}}=\\frac{1}{2} \\mathrm{Cx}_{1}^{2}\\]",
      Status: "UNCHECKED",
    },
  ];

  return (
    <MathJaxContext version={3} config={config}>
      <div className="p-2 bg-gray-100 min-h-screen">
        {questionData.map((question, qIndex) => {
          const [showSolution, setShowSolution] = useState(false);
          const imageMatch = question.English?.match(
            /\\includegraphics\[.*?\]{(.*?)}/
          );
          const imageId = imageMatch ? imageMatch[1] : null;
          const cleanQuestion = question.English?.replace(
            /\\\\/g,
            " \\[ \n \\] "
          ) // Ensures line breaks
            .replace(/\\includegraphics\[.*?\]{.*?}/g, "")
            .trim();

          return (
            <div
              key={qIndex}
              className="mb-6 p-4 bg-white border rounded-lg shadow-md"
            >
              {/* Question Section */}
              <div className="flex justify-between items-start">
                <div className="w-[80%]">
                  {question.AppearedIn ? (
                    <div className="text-red-600">
                      AppearedIn:{question.AppearedIn}
                    </div>
                  ) : (
                    ""
                  )}

                  <div class="custom-mathjax">
                    <MathJax style={{ fontSize: "16px", marginBottom: "10px" }}>
                      {cleanQuestion}
                    </MathJax>
                  </div>
                </div>
                {imageId && question.Images && question.Images[imageId] && (
                  <img
                    src={`data:image/jpeg;base64,${question.Images[imageId]}`}
                    alt="Question Diagram"
                    className="w-[250px] h-[200px] border rounded-lg shadow-sm"
                  />
                )}
              </div>

              {/* Options Section */}
              {question.OptionsEnglish.split("\\\\")
                .filter((option) => option.trim() !== "")
                .map((option, index) => {
                  const correctAnswers = question.Answer.split("&").map(Number);
                  const isCorrect = correctAnswers.includes(index + 1);

                  return (
                    <li
                      key={index}
                      className={`mt-1 text-sm flex items-center ${
                        isCorrect ? "text-green-600 font-bold" : ""
                      }`}
                    >
                      <MathJax inline>{`\\(${option.trim()}\\)`}</MathJax>
                    </li>
                  );
                })}

              {/* Show Solution Button */}
              <div className="mt-4">
                <button
                  className="text-blue-600 font-bold underline cursor-pointer hover:text-blue-800"
                  onClick={() => setShowSolution(!showSolution)}
                >
                  {showSolution ? "Hide Solution" : "Show Solution"}
                </button>
              </div>

              {/* Solution Section */}
              {showSolution && question.SolutionSteps && (
                <div className="mt-4 p-4 bg-gray-100 border rounded-lg">
                  <h6 className="text-base font-bold">Solution:</h6>
                  <MathJax>
                    {question.SolutionSteps.replace(/\\\\/g, " \\[ \n \\] ")}
                  </MathJax>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </MathJaxContext>
  );
}
