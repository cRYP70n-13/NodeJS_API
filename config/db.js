const mongoose = require('mongoose');
const { transformAuthInfo } = require('passport');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewPassword: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useNewUrlParser: true
		})
		console.log(`mongodb connected ${conn.connection.host}`);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

module.exports = connectDB;