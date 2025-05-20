"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Mock user database - keeping this simple for demo purposes
const users = [
  {
    id: "ADM001",
    email: "admin@academiq.edu",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "TCH001",
    email: "teacher@academiq.edu",
    password: "teacher123",
    name: "John Doe",
    role: "teacher",
  },
  {
    id: "STD001",
    email: "student@academiq.edu",
    password: "student123",
    name: "Jane Smith",
    role: "student",
  },
]

export async function login(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      return { success: false, message: "Email and password are required" }
    }

    // Find user with matching credentials
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (!user) {
      return { success: false, message: "Invalid email or password" }
    }

    // Set auth cookie
    cookies().set(
      "auth",
      JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      },
    )

    // Return success before redirect
    // This helps client know login was successful
    return { success: true, redirectTo: getRedirectPath(user.role) }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      message: "An error occurred during login. Please try again.",
    }
  }
}

function getRedirectPath(role: string): string {
  switch (role) {
    case "admin":
      return "/dashboard"
    case "teacher":
      return "/teacher/dashboard"
    case "student":
      return "/student/dashboard"
    default:
      return "/"
  }
}

export async function logout() {
  cookies().delete("auth")
  redirect("/login")
}

export async function getUser() {
  const authCookie = cookies().get("auth")

  if (!authCookie) {
    return null
  }

  try {
    return JSON.parse(authCookie.value)
  } catch (error) {
    console.error("Error parsing auth cookie:", error)
    return null
  }
}

export async function checkAuth() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  return user
}

export async function checkRole(allowedRoles: string[]) {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  if (!allowedRoles.includes(user.role)) {
    redirect(getRedirectPath(user.role))
  }

  return user
}

export async function getCurrentUser() {
  return await getUser()
}
