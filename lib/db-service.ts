// Mock database service for AcademiQ

// Types for our data models
export type User = {
  id: string
  name: string
  email: string
  role: "admin" | "teacher" | "student"
  avatar?: string
  department?: string
  program?: string
  semester?: string
  joinDate: string
}

export type Result = {
  id: string
  studentId: string
  studentName: string
  program: string
  semester: string
  subject: string
  score: number
  totalMarks: number
  percentage: number
  grade: string
  term: string
  academicYear: string
  teacherId: string
  teacherName: string
  date: string
  status: "draft" | "pending" | "published"
  remarks?: string
}

export type Subject = {
  id: string
  name: string
  code: string
  department: string
  creditHours: number
}

export type Class = {
  id: string
  program: string
  semester: string
  academicYear: string
  section?: string
  students: number
}

export type Notification = {
  id: string
  userId: string
  title: string
  message: string
  date: string
  read: boolean
  type: "result" | "announcement" | "system"
}

// Generate mock data
const generateMockUsers = (): User[] => {
  const roles: ("admin" | "teacher" | "student")[] = ["admin", "teacher", "student"]
  const users: User[] = []

  // Generate 3 admins
  for (let i = 1; i <= 3; i++) {
    const adminNames = ["Rajesh Kumar", "Priya Sharma", "Amit Patel"]
    users.push({
      id: `ADM-${i.toString().padStart(3, "0")}`,
      name: adminNames[i - 1],
      email: `admin${i}@academiq.edu`,
      role: "admin",
      joinDate: new Date(2022, 0, i).toISOString(),
    })
  }

  // Generate 10 teachers
  const teacherFirstNames = [
    "Ananya",
    "Vikram",
    "Neha",
    "Rahul",
    "Sunita",
    "Deepak",
    "Meera",
    "Sanjay",
    "Kavita",
    "Arjun",
  ]
  const teacherLastNames = [
    "Sharma",
    "Patel",
    "Singh",
    "Gupta",
    "Verma",
    "Joshi",
    "Malhotra",
    "Kapoor",
    "Agarwal",
    "Reddy",
  ]
  const departments = [
    "Computer Science",
    "Information Technology",
    "Electronics",
    "Electrical Engineering",
    "Mechanical Engineering",
  ]

  for (let i = 1; i <= 10; i++) {
    users.push({
      id: `TCH-${i.toString().padStart(3, "0")}`,
      name: `${teacherFirstNames[i - 1]} ${teacherLastNames[i - 1]}`,
      email: `teacher${i}@academiq.edu`,
      role: "teacher",
      department: departments[Math.floor(Math.random() * departments.length)],
      joinDate: new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    })
  }

  // Generate 50 students
  const studentFirstNames = [
    "Aarav",
    "Aditi",
    "Aryan",
    "Anaya",
    "Vihaan",
    "Ishaan",
    "Anika",
    "Riya",
    "Advait",
    "Diya",
    "Kabir",
    "Anvi",
    "Vivaan",
    "Aanya",
    "Reyansh",
    "Siya",
    "Atharv",
    "Ahana",
    "Dhruv",
    "Pari",
    "Arnav",
    "Saanvi",
    "Rudra",
    "Myra",
    "Ayush",
    "Aadhya",
    "Yuvan",
    "Navya",
    "Krish",
    "Ira",
    "Veer",
    "Amyra",
    "Shaurya",
    "Avni",
    "Arjun",
    "Kiara",
    "Aditya",
    "Sara",
    "Rohan",
    "Amaira",
    "Ayaan",
    "Anvi",
    "Virat",
    "Mishka",
    "Dev",
    "Shanaya",
    "Shivay",
    "Anaya",
    "Daksh",
    "Kyra",
  ]
  const studentLastNames = [
    "Sharma",
    "Patel",
    "Singh",
    "Gupta",
    "Verma",
    "Joshi",
    "Malhotra",
    "Kapoor",
    "Agarwal",
    "Reddy",
    "Mehta",
    "Chopra",
    "Bose",
    "Iyer",
    "Desai",
    "Nair",
    "Rao",
    "Chauhan",
    "Chowdhury",
    "Banerjee",
    "Saxena",
    "Trivedi",
    "Menon",
    "Khanna",
    "Chakraborty",
    "Chatterjee",
    "Mukherjee",
    "Dutta",
    "Sengupta",
    "Dasgupta",
    "Basu",
    "Ghosh",
    "Sinha",
    "Mishra",
    "Tiwari",
    "Pandey",
    "Yadav",
    "Kumar",
    "Kulkarni",
    "Patil",
    "Kaur",
    "Mahajan",
    "Gill",
    "Bajwa",
    "Chadha",
    "Mehra",
    "Ahuja",
    "Arora",
    "Sethi",
    "Bhatia",
  ]

  // Programs and their respective semester counts
  const programs = [
    { name: "BTech", semesters: 8 },
    { name: "BCA", semesters: 6 },
  ]

  for (let i = 1; i <= 50; i++) {
    const firstNameIndex = Math.floor(Math.random() * studentFirstNames.length)
    const lastNameIndex = Math.floor(Math.random() * studentLastNames.length)
    const program = programs[Math.floor(Math.random() * programs.length)]
    const semester = `Semester ${Math.floor(Math.random() * program.semesters) + 1}`

    users.push({
      id: `ST-${i.toString().padStart(3, "0")}`,
      name: `${studentFirstNames[firstNameIndex]} ${studentLastNames[lastNameIndex]}`,
      email: `student${i}@academiq.edu`,
      role: "student",
      program: program.name,
      semester: semester,
      joinDate: new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    })
  }

  return users
}

const generateMockResults = (users: User[]): Result[] => {
  const results: Result[] = []
  const subjects = {
    BTech: [
      "Data Structures & Algorithms",
      "Computer Networks",
      "Database Management Systems",
      "Operating Systems",
      "Software Engineering",
      "Computer Architecture",
      "Theory of Computation",
      "Compiler Design",
      "Machine Learning",
      "Artificial Intelligence",
    ],
    BCA: [
      "Introduction to Programming",
      "Web Development",
      "Database Systems",
      "Computer Networks Basics",
      "Object-Oriented Programming",
      "Data Structures",
      "Software Engineering Fundamentals",
      "Mobile Application Development",
      "Computer Graphics",
      "Project Management",
    ],
  }

  const terms = ["Mid Term", "End Term"]
  const years = ["2021-2022", "2022-2023", "2023-2024"]
  const status: ("draft" | "pending" | "published")[] = ["draft", "pending", "published"]

  const students = users.filter((user) => user.role === "student")
  const teachers = users.filter((user) => user.role === "teacher")

  // Update the grade calculation in the results generation
  for (const student of students) {
    const program = student.program || "BTech"
    const programSubjects = subjects[program as keyof typeof subjects] || subjects["BTech"]

    for (const year of years) {
      for (const term of terms) {
        for (const subject of programSubjects) {
          // Randomly decide if this student has a result for this subject
          if (Math.random() > 0.3) {
            const score = Math.floor(Math.random() * 61) + 40 // Between 40 and 100

            let grade
            if (score >= 95) grade = "O"
            else if (score >= 85) grade = "A+"
            else if (score >= 75) grade = "A"
            else if (score >= 65) grade = "B+"
            else if (score >= 55) grade = "B"
            else if (score >= 45) grade = "C"
            else if (score >= 40) grade = "P"
            else grade = "F"

            const totalMarks = 100
            const percentage = score

            const randomTeacher = teachers[Math.floor(Math.random() * teachers.length)]
            const randomStatus =
              year === "2023-2024" && term === "End Term"
                ? Math.random() > 0.7
                  ? "published"
                  : Math.random() > 0.5
                    ? "pending"
                    : "draft"
                : "published"

            const randomDate = new Date()
            randomDate.setFullYear(Number.parseInt(year.split("-")[0]))

            if (term === "Mid Term")
              randomDate.setMonth(4) // May
            else randomDate.setMonth(11) // December

            randomDate.setDate(Math.floor(Math.random() * 28) + 1)

            results.push({
              id: `RES-${results.length + 1}`,
              studentId: student.id,
              studentName: student.name,
              program: program,
              semester: student.semester || "Semester 1",
              subject,
              score,
              totalMarks,
              percentage,
              grade,
              term,
              academicYear: year,
              teacherId: randomTeacher.id,
              teacherName: randomTeacher.name,
              date: randomDate.toISOString(),
              status: randomStatus,
              remarks: getRandomRemark(grade),
            })
          }
        }
      }
    }
  }

  return results
}

function getRandomRemark(grade: string): string {
  const excellentRemarks = [
    "Excellent performance! Demonstrates deep understanding of the subject.",
    "Outstanding work! Consistently exceeds expectations.",
    "Exceptional grasp of concepts and application skills.",
    "Excellent analytical skills and critical thinking demonstrated.",
    "Superb performance overall. Keep up the great work!",
  ]

  const goodRemarks = [
    "Good work overall. Shows solid understanding of key concepts.",
    "Consistent performance with good application of knowledge.",
    "Good grasp of the subject with room for deeper analysis.",
    "Solid performance demonstrating good comprehension.",
    "Good effort shown throughout the term.",
  ]

  const averageRemarks = [
    "Satisfactory performance. Can improve with more practice.",
    "Shows basic understanding but needs to develop deeper insights.",
    "Average performance. Would benefit from more focused study.",
    "Meets basic requirements but has potential for improvement.",
    "Demonstrates some understanding but needs more consistent effort.",
  ]

  const needsImprovementRemarks = [
    "Needs improvement in core concepts and application.",
    "Struggling with fundamental concepts. Additional support recommended.",
    "Below average performance. Requires focused attention.",
    "Considerable improvement needed. Should seek additional help.",
    "Performance below expectations. Regular practice and review needed.",
  ]

  let remarkPool: string[]

  if (["O", "A+"].includes(grade)) {
    remarkPool = excellentRemarks
  } else if (["A", "B+"].includes(grade)) {
    remarkPool = goodRemarks
  } else if (["B", "C", "P"].includes(grade)) {
    remarkPool = averageRemarks
  } else {
    remarkPool = needsImprovementRemarks
  }

  return remarkPool[Math.floor(Math.random() * remarkPool.length)]
}

const generateMockNotifications = (users: User[], results: Result[]): Notification[] => {
  const notifications: Notification[] = []

  // System notifications for all users
  for (const user of users) {
    notifications.push({
      id: `NOTIF-${notifications.length + 1}`,
      userId: user.id,
      title: "Welcome to AcademiQ",
      message:
        "Welcome to the new AcademiQ Result Management System. Explore the new features to manage academic results efficiently.",
      date: new Date(2023, 0, 15).toISOString(),
      read: true,
      type: "system",
    })

    notifications.push({
      id: `NOTIF-${notifications.length + 1}`,
      userId: user.id,
      title: "System Maintenance",
      message:
        "AcademiQ will undergo scheduled maintenance on Saturday, July 15th from 10 PM to 2 AM. Some features may be unavailable during this time.",
      date: new Date(2023, 6, 10).toISOString(),
      read: Math.random() > 0.5,
      type: "system",
    })
  }

  // Result notifications for students
  const students = users.filter((user) => user.role === "student")
  for (const student of students) {
    const studentResults = results.filter((result) => result.studentId === student.id && result.status === "published")

    // Group by term and academic year
    const groupedResults: Record<string, Result[]> = {}
    for (const result of studentResults) {
      const key = `${result.academicYear}-${result.term}`
      if (!groupedResults[key]) {
        groupedResults[key] = []
      }
      groupedResults[key].push(result)
    }

    // Create notifications for each group
    for (const [key, termResults] of Object.entries(groupedResults)) {
      if (termResults.length > 0) {
        const [year, term] = key.split("-")
        notifications.push({
          id: `NOTIF-${notifications.length + 1}`,
          userId: student.id,
          title: `Results Published: ${term}, ${year}`,
          message: `Your results for ${term}, Academic Year ${year} have been published. You can view them in the Results section.`,
          date: termResults[0].date,
          read: term !== "End Term" || year !== "2023-2024",
          type: "result",
        })
      }
    }
  }

  // Announcement notifications
  const announcementTitles = [
    "Faculty-Student Meeting",
    "Annual Tech Fest",
    "Project Exhibition Registration",
    "Holiday Announcement",
    "Exam Schedule Released",
    "Industrial Visit Registration Open",
  ]

  const announcementMessages = [
    "Faculty-Student meetings will be held on June 15th. Schedule your appointment through the portal.",
    "Annual Tech Fest will be held on August 10th. All students must participate in at least one event.",
    "The Project Exhibition is scheduled for September 5th. Registration is now open for all interested students.",
    "The college will remain closed from October 2nd to October 10th for the mid-term break.",
    "Final examination schedule has been released. Please check the calendar for dates and timings.",
    "Registration for the industrial visit to Tech Park is now open. Limited spots available.",
  ]

  for (let i = 0; i < announcementTitles.length; i++) {
    const date = new Date(2023, i + 1, Math.floor(Math.random() * 28) + 1).toISOString()

    // Add for all users
    for (const user of users) {
      notifications.push({
        id: `NOTIF-${notifications.length + 1}`,
        userId: user.id,
        title: announcementTitles[i],
        message: announcementMessages[i],
        date,
        read: Math.random() > 0.3,
        type: "announcement",
      })
    }
  }

  return notifications
}

// Initialize mock data
const users = generateMockUsers()
const results = generateMockResults(users)
const notifications = generateMockNotifications(users, results)

// Database service functions
export const dbService = {
  // User functions
  getUsers: () => users,
  getUserById: (id: string) => users.find((user) => user.id === id),
  getUsersByRole: (role: "admin" | "teacher" | "student") => users.filter((user) => user.role === role),

  // Result functions
  getResults: () => results,
  getResultById: (id: string) => results.find((result) => result.id === id),
  getResultsByStudentId: (studentId: string) => results.filter((result) => result.studentId === studentId),
  getResultsByTeacherId: (teacherId: string) => results.filter((result) => result.teacherId === teacherId),
  getResultsByProgram: (program: string) => results.filter((result) => result.program === program),
  getResultsBySemester: (semester: string) => results.filter((result) => result.semester === semester),
  getResultsBySubject: (subject: string) => results.filter((result) => result.subject === subject),
  getResultsByTerm: (term: string, academicYear: string) =>
    results.filter((result) => result.term === term && result.academicYear === academicYear),
  getPublishedResults: () => results.filter((result) => result.status === "published"),
  getPendingResults: () => results.filter((result) => result.status === "pending"),
  getDraftResults: () => results.filter((result) => result.status === "draft"),

  // Notification functions
  getNotifications: () => notifications,
  getNotificationsByUserId: (userId: string) => notifications.filter((notification) => notification.userId === userId),
  getUnreadNotificationsByUserId: (userId: string) =>
    notifications.filter((notification) => notification.userId === userId && !notification.read),

  // Statistics and analytics
  getSemesterAverages: () => {
    const semesterAverages: Record<string, Record<string, number>> = {}

    // Get unique semesters
    const semesters = [...new Set(results.map((result) => result.semester))]

    // Get unique subjects
    const subjects = [...new Set(results.map((result) => result.subject))]

    // Calculate average for each semester and subject
    for (const semester of semesters) {
      semesterAverages[semester] = {}

      for (const subject of subjects) {
        const subjectResults = results.filter(
          (result) => result.semester === semester && result.subject === subject && result.status === "published",
        )

        if (subjectResults.length > 0) {
          const total = subjectResults.reduce((sum, result) => sum + result.percentage, 0)
          semesterAverages[semester][subject] = Number.parseFloat((total / subjectResults.length).toFixed(2))
        }
      }
    }

    return semesterAverages
  },

  getSubjectAverages: () => {
    const subjectAverages: Record<string, Record<string, number>> = {}

    // Get unique academic years
    const academicYears = [...new Set(results.map((result) => result.academicYear))]

    // Get unique subjects
    const subjects = [...new Set(results.map((result) => result.subject))]

    // Calculate average for each subject by academic year
    for (const subject of subjects) {
      subjectAverages[subject] = {}

      for (const year of academicYears) {
        const yearResults = results.filter(
          (result) => result.subject === subject && result.academicYear === year && result.status === "published",
        )

        if (yearResults.length > 0) {
          const total = yearResults.reduce((sum, result) => sum + result.percentage, 0)
          subjectAverages[subject][year] = Number.parseFloat((total / yearResults.length).toFixed(2))
        }
      }
    }

    return subjectAverages
  },

  getStudentPerformanceTrend: (studentId: string) => {
    const performanceTrend: Record<string, Record<string, number>> = {}

    // Get unique academic years
    const academicYears = [...new Set(results.map((result) => result.academicYear))]

    // Get unique terms
    const terms = [...new Set(results.map((result) => result.term))]

    // Get student results
    const studentResults = results.filter((result) => result.studentId === studentId && result.status === "published")

    // Calculate average for each term and year
    for (const year of academicYears) {
      performanceTrend[year] = {}

      for (const term of terms) {
        const termResults = studentResults.filter((result) => result.academicYear === year && result.term === term)

        if (termResults.length > 0) {
          const total = termResults.reduce((sum, result) => sum + result.percentage, 0)
          performanceTrend[year][term] = Number.parseFloat((total / termResults.length).toFixed(2))
        }
      }
    }

    return performanceTrend
  },

  calculateGPA: (studentId: string, term: string, academicYear: string) => {
    const studentResults = results.filter(
      (result) =>
        result.studentId === studentId &&
        result.term === term &&
        result.academicYear === academicYear &&
        result.status === "published",
    )

    if (studentResults.length === 0) {
      return 0
    }

    let totalGradePoints = 0

    for (const result of studentResults) {
      let gradePoint = 0

      switch (result.grade) {
        case "O":
          gradePoint = 10.0
          break
        case "A+":
          gradePoint = 9.0
          break
        case "A":
          gradePoint = 8.0
          break
        case "B+":
          gradePoint = 7.0
          break
        case "B":
          gradePoint = 6.0
          break
        case "C":
          gradePoint = 5.0
          break
        case "P":
          gradePoint = 4.0
          break
        default:
          gradePoint = 0.0
      }

      totalGradePoints += gradePoint
    }

    return Number.parseFloat((totalGradePoints / studentResults.length).toFixed(2))
  },

  // Dashboard statistics
  getDashboardStats: (userRole: "admin" | "teacher" | "student", userId: string) => {
    // Common stats
    const totalStudents = users.filter((user) => user.role === "student").length
    const totalTeachers = users.filter((user) => user.role === "teacher").length
    const totalResults = results.filter((result) => result.status === "published").length
    const pendingResults = results.filter((result) => result.status === "pending").length

    // Calculate overall average
    const publishedResults = results.filter((result) => result.status === "published")
    const totalPercentage = publishedResults.reduce((sum, result) => sum + result.percentage, 0)
    const overallAverage = Number.parseFloat((totalPercentage / (publishedResults.length || 1)).toFixed(2))

    // Role-specific stats
    if (userRole === "admin") {
      return {
        totalStudents,
        totalTeachers,
        totalResults,
        pendingResults,
        overallAverage,
        recentlyPublished: publishedResults
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5),
      }
    } else if (userRole === "teacher") {
      const teacherResults = results.filter((result) => result.teacherId === userId)
      const teacherPublishedResults = teacherResults.filter((result) => result.status === "published")
      const teacherPendingResults = teacherResults.filter((result) => result.status === "pending")
      const teacherDraftResults = teacherResults.filter((result) => result.status === "draft")

      // Teacher's results average
      const totalTeacherPercentage = teacherPublishedResults.reduce((sum, result) => sum + result.percentage, 0)
      const teacherAverage = Number.parseFloat(
        (totalTeacherPercentage / (teacherPublishedResults.length || 1)).toFixed(2),
      )

      return {
        totalStudents,
        teacherPublishedResults: teacherPublishedResults.length,
        teacherPendingResults: teacherPendingResults.length,
        teacherDraftResults: teacherDraftResults.length,
        teacherAverage,
        overallAverage,
        recentlyPublished: teacherPublishedResults
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5),
      }
    } else {
      // Student stats
      const studentResults = results.filter((result) => result.studentId === userId && result.status === "published")

      // Student's average
      const totalStudentPercentage = studentResults.reduce((sum, result) => sum + result.percentage, 0)
      const studentAverage = Number.parseFloat((totalStudentPercentage / (studentResults.length || 1)).toFixed(2))

      // Get latest term results
      const latestResults =
        studentResults.length > 0
          ? studentResults.reduce((latest, current) => {
              const latestDate = new Date(latest.date).getTime()
              const currentDate = new Date(current.date).getTime()
              return currentDate > latestDate ? current : latest
            })
          : null

      const latestTerm = latestResults?.term
      const latestYear = latestResults?.academicYear

      // Get results for latest term
      const latestTermResults = studentResults.filter(
        (result) => result.term === latestTerm && result.academicYear === latestYear,
      )

      // Calculate GPA
      const gpa = latestTerm && latestYear ? dbService.calculateGPA(userId, latestTerm, latestYear) : 0

      return {
        studentAverage,
        overallAverage,
        totalSubjects: [...new Set(studentResults.map((result) => result.subject))].length,
        latestResults: latestTermResults,
        gpa,
      }
    }
  },
}
