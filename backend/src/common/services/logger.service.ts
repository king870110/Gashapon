import { Injectable } from "@nestjs/common"
import * as winston from "winston"

@Injectable()
export class LoggerService {
	private logger: winston.Logger

	constructor() {
		this.logger = winston.createLogger({
			level: "info",
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json()
			),
			transports: [
				new winston.transports.File({
					filename: "logs/error.log",
					level: "error",
				}),
				new winston.transports.File({ filename: "logs/combined.log" }),
			],
		})

		if (process.env.NODE_ENV !== "production") {
			this.logger.add(
				new winston.transports.Console({
					format: winston.format.simple(),
				})
			)
		}
	}

	log(message: string) {
		this.logger.info(message)
	}

	error(message: string, trace: string) {
		this.logger.error(message, { trace })
	}

	warn(message: string) {
		this.logger.warn(message)
	}

	debug(message: string) {
		this.logger.debug(message)
	}
}
