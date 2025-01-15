import React, { createContext, useState, useEffect } from "react"
import { isAuthenticated, setToken, removeToken } from "../utils/auth"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(isAuthenticated())
	const [role, setRole] = useState(null)
	const [userId, setUserId] = useState(null)

	useEffect(() => {
		if (loggedIn) {
			const storedRole = localStorage.getItem("role")
			const storedUserId = localStorage.getItem("userId")
			setRole(storedRole)
			setUserId(storedUserId)
		}
	}, [loggedIn])

	const login = (token, userRole, id) => {
		setToken(token)
		localStorage.setItem("role", userRole)
		localStorage.setItem("userId", id)
		setRole(userRole)
		setUserId(id)
		setLoggedIn(true)
	}

	const logout = () => {
		removeToken()
		localStorage.removeItem("role")
		localStorage.removeItem("userId")
		setRole(null)
		setUserId(null)
		setLoggedIn(false)
	}

	return (
		<AuthContext.Provider value={{ loggedIn, role, userId, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
