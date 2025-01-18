import React from "react"
import { Row, Col, Form, Button } from "react-bootstrap"
import { IoSearch } from "react-icons/io5"
import { IoIosRefresh } from "react-icons/io"

const Filter = ({ inputRef, handleSubmit, handleClear }) => {
	return (
		<Form onSubmit={handleSubmit}>
			<Row className="align-items-center">
				<Col xs={11} style={{ display: "flex", gap: "10px" }}>
					<Form.Control
						type="text"
						placeholder="輸入商品名稱"
						ref={inputRef} // 綁定 inputRef
					/>
					<Button type="submit" style={{ width: "fit-content" }}>
						<IoSearch></IoSearch>
					</Button>
					<Button
						variant="secondary"
						onClick={handleClear} // 綁定 handleClear
						style={{ width: "fit-content" }}
					>
						<IoIosRefresh></IoIosRefresh>
					</Button>
				</Col>
			</Row>
		</Form>
	)
}

export default Filter
