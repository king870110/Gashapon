import React from "react"
import "../styles/Switch.css" // We'll create this CSS file in the next step

const Switch = ({ isChecked, onChange }) => {
	return (
		<div className="switch-container">
			<label className="switch">
				<input
					type="checkbox"
					checked={isChecked}
					onChange={(e) => {
						e.stopPropagation() // 阻止事件冒泡
						if (typeof onChange === "function") {
							onChange(e.target.checked) // 將新的狀態傳遞給父組件
						} else {
							console.error("onChange is not a function")
						}
					}}
				/>
				<span className="slider"></span>
			</label>
		</div>
	)
}

export default Switch
