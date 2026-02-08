// Mech Skills Database - Comprehensive skill data for ME students

export interface SkillResource {
    title: string;
    type: 'video' | 'course' | 'docs' | 'project';
    url: string;
    free: boolean;
}

export interface Skill {
    id: string;
    name: string;
    category: string;
    demandLevel: 'high' | 'emerging' | 'stable';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedHours: number;
    description: string;
    resources: SkillResource[];
}

export interface SkillCategory {
    id: string;
    name: string;
    icon: string;
    description: string;
    skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
    {
        id: 'cad-cam',
        name: 'CAD/CAM',
        icon: '🖥️',
        description: 'Computer-Aided Design & Manufacturing tools',
        skills: [
            {
                id: 'solidworks',
                name: 'SolidWorks',
                category: 'cad-cam',
                demandLevel: 'high',
                difficulty: 'beginner',
                estimatedHours: 50,
                description: 'Industry-standard 3D CAD software for product design and simulation.',
                resources: [
                    { title: 'Official SolidWorks Tutorials', type: 'docs', url: 'https://www.solidworks.com/sw/resources/solidworks-tutorials.htm', free: true },
                    { title: 'SolidWorks Full Course - YouTube', type: 'video', url: 'https://www.youtube.com/watch?v=FkMJGg9gxkg', free: true },
                    { title: 'Udemy: Complete SolidWorks Masterclass', type: 'course', url: 'https://www.udemy.com/course/solidworks-3d-cad/', free: false }
                ]
            },
            {
                id: 'autocad',
                name: 'AutoCAD',
                category: 'cad-cam',
                demandLevel: 'stable',
                difficulty: 'beginner',
                estimatedHours: 40,
                description: '2D drafting and documentation standard in engineering.',
                resources: [
                    { title: 'AutoCAD Learning Portal', type: 'docs', url: 'https://www.autodesk.com/certification/learn', free: true },
                    { title: 'AutoCAD Basics - Autodesk', type: 'video', url: 'https://www.youtube.com/c/Autodesk', free: true }
                ]
            },
            {
                id: 'catia',
                name: 'CATIA',
                category: 'cad-cam',
                demandLevel: 'high',
                difficulty: 'advanced',
                estimatedHours: 80,
                description: 'Advanced surface modeling for automotive and aerospace.',
                resources: [
                    { title: 'CATIA V5 Fundamentals', type: 'course', url: 'https://www.coursera.org/learn/cad-catia', free: false },
                    { title: 'CATIA Tutorials Playlist', type: 'video', url: 'https://www.youtube.com/results?search_query=catia+v5+tutorial', free: true }
                ]
            },
            {
                id: 'fusion360',
                name: 'Fusion 360',
                category: 'cad-cam',
                demandLevel: 'emerging',
                difficulty: 'beginner',
                estimatedHours: 35,
                description: 'Cloud-based CAD/CAM with generative design capabilities.',
                resources: [
                    { title: 'Fusion 360 Self-Paced Learning', type: 'docs', url: 'https://www.autodesk.com/products/fusion-360/learn', free: true },
                    { title: 'Product Design Online', type: 'video', url: 'https://www.youtube.com/@ProductDesignOnline', free: true }
                ]
            },
            {
                id: 'nx-cad',
                name: 'Siemens NX',
                category: 'cad-cam',
                demandLevel: 'high',
                difficulty: 'advanced',
                estimatedHours: 90,
                description: 'Enterprise-level CAD/CAM/CAE for complex assemblies.',
                resources: [
                    { title: 'Siemens NX Learning', type: 'docs', url: 'https://www.plm.automation.siemens.com/global/en/products/nx/', free: true },
                    { title: 'NX CAD Tutorials', type: 'video', url: 'https://www.youtube.com/results?search_query=siemens+nx+tutorial', free: true }
                ]
            }
        ]
    },
    {
        id: 'simulation',
        name: 'Simulation & FEA',
        icon: '📊',
        description: 'Finite Element Analysis and computational simulation',
        skills: [
            {
                id: 'ansys',
                name: 'ANSYS',
                category: 'simulation',
                demandLevel: 'high',
                difficulty: 'intermediate',
                estimatedHours: 70,
                description: 'Industry-leading simulation software for structural, thermal, and fluid analysis.',
                resources: [
                    { title: 'ANSYS Innovation Courses', type: 'course', url: 'https://courses.ansys.com/', free: true },
                    { title: 'ANSYS Student Community', type: 'docs', url: 'https://www.ansys.com/academic/students', free: true },
                    { title: 'FEA with ANSYS - Cornell', type: 'video', url: 'https://www.youtube.com/results?search_query=ansys+fea+tutorial', free: true }
                ]
            },
            {
                id: 'abaqus',
                name: 'Abaqus',
                category: 'simulation',
                demandLevel: 'stable',
                difficulty: 'advanced',
                estimatedHours: 80,
                description: 'Advanced FEA for nonlinear analysis and explicit dynamics.',
                resources: [
                    { title: 'Abaqus Learning Edition', type: 'docs', url: 'https://edu.3ds.com/en/software/abaqus-learning-edition', free: true },
                    { title: 'Abaqus Tutorials', type: 'video', url: 'https://www.youtube.com/results?search_query=abaqus+tutorial', free: true }
                ]
            },
            {
                id: 'cfd-basics',
                name: 'CFD Fundamentals',
                category: 'simulation',
                demandLevel: 'emerging',
                difficulty: 'intermediate',
                estimatedHours: 60,
                description: 'Computational Fluid Dynamics for thermal and flow analysis.',
                resources: [
                    { title: 'OpenFOAM Tutorials', type: 'docs', url: 'https://www.openfoam.com/documentation/tutorial-guide', free: true },
                    { title: 'CFD Online Basics', type: 'course', url: 'https://www.cfd-online.com/', free: true }
                ]
            },
            {
                id: 'matlab-simulink',
                name: 'MATLAB/Simulink',
                category: 'simulation',
                demandLevel: 'high',
                difficulty: 'intermediate',
                estimatedHours: 60,
                description: 'Numerical computing and system simulation for engineering.',
                resources: [
                    { title: 'MATLAB Onramp', type: 'course', url: 'https://matlabacademy.mathworks.com/', free: true },
                    { title: 'Simulink Tutorials', type: 'video', url: 'https://www.youtube.com/results?search_query=simulink+tutorial', free: true }
                ]
            }
        ]
    },
    {
        id: 'manufacturing',
        name: 'Manufacturing',
        icon: '🏭',
        description: 'Production processes and quality standards',
        skills: [
            {
                id: 'cnc',
                name: 'CNC Programming',
                category: 'manufacturing',
                demandLevel: 'high',
                difficulty: 'intermediate',
                estimatedHours: 60,
                description: 'G-code programming and CNC machine operation.',
                resources: [
                    { title: 'CNC Cookbook', type: 'docs', url: 'https://www.cnccookbook.com/', free: true },
                    { title: 'Titans of CNC Academy', type: 'video', url: 'https://www.youtube.com/@TitansOfCNC', free: true }
                ]
            },
            {
                id: 'gdt',
                name: 'GD&T',
                category: 'manufacturing',
                demandLevel: 'high',
                difficulty: 'intermediate',
                estimatedHours: 30,
                description: 'Geometric Dimensioning & Tolerancing per ASME Y14.5.',
                resources: [
                    { title: 'GD&T Basics - Engineers Edge', type: 'docs', url: 'https://www.engineersedge.com/gdt.htm', free: true },
                    { title: 'LinkedIn Learning: GD&T', type: 'course', url: 'https://www.linkedin.com/learning/topics/geometric-dimensioning-and-tolerancing', free: false }
                ]
            },
            {
                id: 'lean-six-sigma',
                name: 'Lean Six Sigma',
                category: 'manufacturing',
                demandLevel: 'stable',
                difficulty: 'beginner',
                estimatedHours: 40,
                description: 'Process improvement methodology for reducing waste.',
                resources: [
                    { title: 'ASQ Lean Six Sigma', type: 'docs', url: 'https://asq.org/quality-resources/lean', free: true },
                    { title: 'Coursera: Six Sigma Yellow Belt', type: 'course', url: 'https://www.coursera.org/learn/six-sigma-fundamentals', free: false }
                ]
            },
            {
                id: '3d-printing',
                name: '3D Printing/Additive Manufacturing',
                category: 'manufacturing',
                demandLevel: 'emerging',
                difficulty: 'beginner',
                estimatedHours: 25,
                description: 'FDM, SLA, and metal 3D printing technologies.',
                resources: [
                    { title: 'Prusa 3D Printing Handbook', type: 'docs', url: 'https://www.prusa3d.com/page/basics-of-3d-printing/', free: true },
                    { title: '3D Printing Nerd', type: 'video', url: 'https://www.youtube.com/@3DPrintingNerd', free: true }
                ]
            },
            {
                id: 'injection-molding',
                name: 'Injection Molding',
                category: 'manufacturing',
                demandLevel: 'stable',
                difficulty: 'intermediate',
                estimatedHours: 45,
                description: 'Plastic injection molding design and process optimization.',
                resources: [
                    { title: 'Protolabs Design Guide', type: 'docs', url: 'https://www.protolabs.com/resources/design-tips/', free: true },
                    { title: 'Injection Molding Basics', type: 'video', url: 'https://www.youtube.com/results?search_query=injection+molding+design', free: true }
                ]
            }
        ]
    },
    {
        id: 'robotics',
        name: 'Robotics',
        icon: '🤖',
        description: 'Robot design, programming, and integration',
        skills: [
            {
                id: 'ros',
                name: 'ROS (Robot Operating System)',
                category: 'robotics',
                demandLevel: 'emerging',
                difficulty: 'advanced',
                estimatedHours: 100,
                description: 'Open-source framework for robot software development.',
                resources: [
                    { title: 'ROS Wiki Tutorials', type: 'docs', url: 'https://wiki.ros.org/ROS/Tutorials', free: true },
                    { title: 'The Construct ROS Courses', type: 'course', url: 'https://www.theconstructsim.com/', free: false },
                    { title: 'ROS2 for Beginners', type: 'video', url: 'https://www.youtube.com/results?search_query=ros2+tutorial', free: true }
                ]
            },
            {
                id: 'robot-kinematics',
                name: 'Robot Kinematics',
                category: 'robotics',
                demandLevel: 'stable',
                difficulty: 'advanced',
                estimatedHours: 50,
                description: 'Forward/inverse kinematics, DH parameters, trajectory planning.',
                resources: [
                    { title: 'MIT Robotics Course', type: 'course', url: 'https://ocw.mit.edu/courses/mechanical-engineering/2-12-introduction-to-robotics-fall-2005/', free: true },
                    { title: 'Robotics Specialization - Coursera', type: 'course', url: 'https://www.coursera.org/specializations/modernrobotics', free: false }
                ]
            },
            {
                id: 'arduino-robotics',
                name: 'Arduino for Robotics',
                category: 'robotics',
                demandLevel: 'stable',
                difficulty: 'beginner',
                estimatedHours: 30,
                description: 'Microcontroller programming for robot control.',
                resources: [
                    { title: 'Arduino Official Tutorials', type: 'docs', url: 'https://docs.arduino.cc/', free: true },
                    { title: 'Paul McWhorter Arduino', type: 'video', url: 'https://www.youtube.com/@paaboron', free: true }
                ]
            },
            {
                id: 'cobot-programming',
                name: 'Collaborative Robot Programming',
                category: 'robotics',
                demandLevel: 'high',
                difficulty: 'intermediate',
                estimatedHours: 45,
                description: 'Programming UR, FANUC, ABB cobots for industrial tasks.',
                resources: [
                    { title: 'Universal Robots Academy', type: 'course', url: 'https://academy.universal-robots.com/', free: true },
                    { title: 'ABB RobotStudio', type: 'docs', url: 'https://new.abb.com/products/robotics/robotstudio', free: true }
                ]
            },
            {
                id: 'robot-vision',
                name: 'Robot Vision & OpenCV',
                category: 'robotics',
                demandLevel: 'emerging',
                difficulty: 'intermediate',
                estimatedHours: 55,
                description: 'Computer vision for robot perception and object detection.',
                resources: [
                    { title: 'OpenCV Python Tutorials', type: 'docs', url: 'https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html', free: true },
                    { title: 'PyImageSearch', type: 'video', url: 'https://pyimagesearch.com/', free: true }
                ]
            }
        ]
    },
    {
        id: 'automation',
        name: 'Industrial Automation',
        icon: '⚙️',
        description: 'PLC, SCADA, and control systems',
        skills: [
            {
                id: 'plc',
                name: 'PLC Programming',
                category: 'automation',
                demandLevel: 'high',
                difficulty: 'intermediate',
                estimatedHours: 70,
                description: 'Programmable Logic Controllers for industrial automation.',
                resources: [
                    { title: 'Siemens TIA Portal Training', type: 'docs', url: 'https://www.siemens.com/global/en/products/automation/industry-software/automation-software/tia-portal.html', free: true },
                    { title: 'PLC Fiddle (Simulator)', type: 'project', url: 'https://www.plcfiddle.com/', free: true },
                    { title: 'RealPars PLC Courses', type: 'video', url: 'https://www.youtube.com/@realpars', free: true }
                ]
            },
            {
                id: 'scada',
                name: 'SCADA Systems',
                category: 'automation',
                demandLevel: 'high',
                difficulty: 'intermediate',
                estimatedHours: 50,
                description: 'Supervisory Control and Data Acquisition for process monitoring.',
                resources: [
                    { title: 'Ignition SCADA Training', type: 'course', url: 'https://inductiveuniversity.com/', free: true },
                    { title: 'SCADA Basics', type: 'video', url: 'https://www.youtube.com/results?search_query=scada+tutorial', free: true }
                ]
            },
            {
                id: 'hmi-design',
                name: 'HMI Design',
                category: 'automation',
                demandLevel: 'stable',
                difficulty: 'beginner',
                estimatedHours: 35,
                description: 'Human-Machine Interface design for operator panels.',
                resources: [
                    { title: 'HMI Design Best Practices', type: 'docs', url: 'https://www.controleng.com/', free: true },
                    { title: 'Siemens WinCC Tutorials', type: 'video', url: 'https://www.youtube.com/results?search_query=wincc+hmi+tutorial', free: true }
                ]
            },
            {
                id: 'industrial-networks',
                name: 'Industrial Networks (Profinet/EtherCAT)',
                category: 'automation',
                demandLevel: 'emerging',
                difficulty: 'advanced',
                estimatedHours: 45,
                description: 'Industrial communication protocols for automation systems.',
                resources: [
                    { title: 'Profinet University', type: 'docs', url: 'https://www.profinet.com/', free: true },
                    { title: 'EtherCAT Technology', type: 'docs', url: 'https://www.ethercat.org/en/technology.html', free: true }
                ]
            },
            {
                id: 'vfd-drives',
                name: 'VFD & Motor Control',
                category: 'automation',
                demandLevel: 'high',
                difficulty: 'intermediate',
                estimatedHours: 40,
                description: 'Variable Frequency Drives and AC motor speed control.',
                resources: [
                    { title: 'ABB Drives Academy', type: 'course', url: 'https://new.abb.com/drives', free: true },
                    { title: 'VFD Basics Explained', type: 'video', url: 'https://www.youtube.com/results?search_query=vfd+basics', free: true }
                ]
            }
        ]
    },
    {
        id: 'hvac',
        name: 'HVAC & Thermal',
        icon: '❄️',
        description: 'Heating, Ventilation, Air Conditioning systems',
        skills: [
            {
                id: 'hvac-fundamentals',
                name: 'HVAC Fundamentals',
                category: 'hvac',
                demandLevel: 'stable',
                difficulty: 'beginner',
                estimatedHours: 40,
                description: 'Basic principles of heating, cooling, and ventilation systems.',
                resources: [
                    { title: 'ASHRAE Fundamentals', type: 'docs', url: 'https://www.ashrae.org/', free: true },
                    { title: 'HVAC School Podcast', type: 'video', url: 'https://www.youtube.com/@HVACSCHOOL', free: true }
                ]
            },
            {
                id: 'refrigeration',
                name: 'Refrigeration Cycles',
                category: 'hvac',
                demandLevel: 'stable',
                difficulty: 'intermediate',
                estimatedHours: 35,
                description: 'Vapor compression, absorption cycles, and refrigerant properties.',
                resources: [
                    { title: 'MIT Thermodynamics', type: 'course', url: 'https://ocw.mit.edu/', free: true },
                    { title: 'Engineering Mindset - HVAC', type: 'video', url: 'https://www.youtube.com/@TheEngineeringMindset', free: true }
                ]
            },
            {
                id: 'hvac-load-calc',
                name: 'HVAC Load Calculations',
                category: 'hvac',
                demandLevel: 'high',
                difficulty: 'intermediate',
                estimatedHours: 30,
                description: 'Manual J/D calculations for residential and commercial buildings.',
                resources: [
                    { title: 'ACCA Manual J', type: 'docs', url: 'https://www.acca.org/standards/manuals', free: false },
                    { title: 'Load Calc Software', type: 'project', url: 'https://www.wrightsoft.com/', free: false }
                ]
            },
            {
                id: 'duct-design',
                name: 'Duct Design',
                category: 'hvac',
                demandLevel: 'stable',
                difficulty: 'intermediate',
                estimatedHours: 25,
                description: 'Air distribution system sizing and layout.',
                resources: [
                    { title: 'SMACNA Duct Standards', type: 'docs', url: 'https://www.smacna.org/', free: false },
                    { title: 'Duct Design Basics', type: 'video', url: 'https://www.youtube.com/results?search_query=hvac+duct+design', free: true }
                ]
            },
            {
                id: 'building-automation',
                name: 'Building Automation Systems',
                category: 'hvac',
                demandLevel: 'emerging',
                difficulty: 'advanced',
                estimatedHours: 60,
                description: 'BACnet, smart building controls, and energy management.',
                resources: [
                    { title: 'BACnet International', type: 'docs', url: 'https://www.bacnetinternational.org/', free: true },
                    { title: 'Johnson Controls Training', type: 'course', url: 'https://www.johnsoncontrols.com/', free: false }
                ]
            }
        ]
    },
    {
        id: 'industry4',
        name: 'Industry 4.0',
        icon: '🌐',
        description: 'Smart manufacturing and digital transformation',
        skills: [
            {
                id: 'iot',
                name: 'Industrial IoT',
                category: 'industry4',
                demandLevel: 'emerging',
                difficulty: 'intermediate',
                estimatedHours: 50,
                description: 'Sensor integration, data acquisition, and cloud connectivity.',
                resources: [
                    { title: 'AWS IoT Core Training', type: 'course', url: 'https://aws.amazon.com/iot/', free: true },
                    { title: 'Arduino IoT Cloud', type: 'project', url: 'https://cloud.arduino.cc/', free: true }
                ]
            },
            {
                id: 'digital-twin',
                name: 'Digital Twin',
                category: 'industry4',
                demandLevel: 'emerging',
                difficulty: 'advanced',
                estimatedHours: 70,
                description: 'Virtual replicas of physical systems for simulation and optimization.',
                resources: [
                    { title: 'Siemens Digital Twin', type: 'docs', url: 'https://www.siemens.com/digital-twin', free: true },
                    { title: 'Azure Digital Twins', type: 'course', url: 'https://learn.microsoft.com/en-us/azure/digital-twins/', free: true }
                ]
            },
            {
                id: 'predictive-maintenance',
                name: 'Predictive Maintenance',
                category: 'industry4',
                demandLevel: 'high',
                difficulty: 'intermediate',
                estimatedHours: 45,
                description: 'ML-based condition monitoring and failure prediction.',
                resources: [
                    { title: 'AWS Predictive Maintenance', type: 'docs', url: 'https://aws.amazon.com/solutions/implementations/predictive-maintenance/', free: true },
                    { title: 'Vibration Analysis Basics', type: 'video', url: 'https://www.youtube.com/results?search_query=vibration+analysis+predictive+maintenance', free: true }
                ]
            },
            {
                id: 'mes-erp',
                name: 'MES & ERP Integration',
                category: 'industry4',
                demandLevel: 'stable',
                difficulty: 'intermediate',
                estimatedHours: 40,
                description: 'Manufacturing Execution Systems and enterprise resource planning.',
                resources: [
                    { title: 'SAP Learning Hub', type: 'course', url: 'https://learning.sap.com/', free: false },
                    { title: 'MES Explained', type: 'video', url: 'https://www.youtube.com/results?search_query=manufacturing+execution+system', free: true }
                ]
            }
        ]
    },
    {
        id: 'core',
        name: 'Core Fundamentals',
        icon: '📚',
        description: 'Essential mechanical engineering theory',
        skills: [
            {
                id: 'thermodynamics',
                name: 'Thermodynamics',
                category: 'core',
                demandLevel: 'stable',
                difficulty: 'intermediate',
                estimatedHours: 60,
                description: 'Energy systems, heat transfer, and thermodynamic cycles.',
                resources: [
                    { title: 'MIT OpenCourseWare: Thermo', type: 'course', url: 'https://ocw.mit.edu/courses/mechanical-engineering/2-005-thermal-fluids-engineering-i-fall-2019/', free: true },
                    { title: 'NPTEL Thermodynamics', type: 'video', url: 'https://nptel.ac.in/', free: true }
                ]
            },
            {
                id: 'machine-design',
                name: 'Machine Design',
                category: 'core',
                demandLevel: 'stable',
                difficulty: 'advanced',
                estimatedHours: 80,
                description: 'Design of mechanical elements: shafts, gears, bearings.',
                resources: [
                    { title: 'Shigley\'s Mechanical Engineering Design', type: 'docs', url: 'https://www.mheducation.com/', free: false },
                    { title: 'NPTEL Machine Design', type: 'video', url: 'https://nptel.ac.in/', free: true }
                ]
            },
            {
                id: 'mechanics-materials',
                name: 'Mechanics of Materials',
                category: 'core',
                demandLevel: 'stable',
                difficulty: 'intermediate',
                estimatedHours: 50,
                description: 'Stress, strain, bending, torsion, and failure theories.',
                resources: [
                    { title: 'MIT Solid Mechanics', type: 'course', url: 'https://ocw.mit.edu/', free: true },
                    { title: 'Jeff Hanson Mechanics', type: 'video', url: 'https://www.youtube.com/@JeffHansonMechanics', free: true }
                ]
            },
            {
                id: 'fluid-mechanics',
                name: 'Fluid Mechanics',
                category: 'core',
                demandLevel: 'stable',
                difficulty: 'intermediate',
                estimatedHours: 55,
                description: 'Fluid statics, dynamics, pipe flow, and pumps.',
                resources: [
                    { title: 'NPTEL Fluid Mechanics', type: 'video', url: 'https://nptel.ac.in/', free: true },
                    { title: 'MIT Fluid Dynamics', type: 'course', url: 'https://ocw.mit.edu/', free: true }
                ]
            }
        ]
    },
    {
        id: 'soft-skills',
        name: 'Soft Skills',
        icon: '💬',
        description: 'Professional and communication skills',
        skills: [
            {
                id: 'technical-writing',
                name: 'Technical Communication',
                category: 'soft-skills',
                demandLevel: 'stable',
                difficulty: 'beginner',
                estimatedHours: 20,
                description: 'Writing reports, documentation, and presentations.',
                resources: [
                    { title: 'Google Technical Writing', type: 'course', url: 'https://developers.google.com/tech-writing', free: true }
                ]
            },
            {
                id: 'project-management',
                name: 'Project Management',
                category: 'soft-skills',
                demandLevel: 'stable',
                difficulty: 'beginner',
                estimatedHours: 30,
                description: 'Agile, Scrum, and engineering project planning.',
                resources: [
                    { title: 'Google Project Management Certificate', type: 'course', url: 'https://www.coursera.org/professional-certificates/google-project-management', free: false }
                ]
            },
            {
                id: 'presentation-skills',
                name: 'Presentation Skills',
                category: 'soft-skills',
                demandLevel: 'stable',
                difficulty: 'beginner',
                estimatedHours: 15,
                description: 'Effective technical presentations and public speaking.',
                resources: [
                    { title: 'TED Talks Speaking', type: 'video', url: 'https://www.ted.com/talks', free: true },
                    { title: 'LinkedIn Presentation Skills', type: 'course', url: 'https://www.linkedin.com/learning/topics/presentation-skills', free: false }
                ]
            }
        ]
    }
];

// Helper to get all skills flattened
export const getAllSkills = (): Skill[] => {
    return SKILL_CATEGORIES.flatMap(cat => cat.skills);
};

// Helper to get skill by ID
export const getSkillById = (id: string): Skill | undefined => {
    return getAllSkills().find(s => s.id === id);
};
