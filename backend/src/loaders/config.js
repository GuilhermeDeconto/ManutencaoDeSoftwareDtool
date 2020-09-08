import dotenv from "dotenv"

export default () => {
  const envFound = dotenv.config()

  if (!envFound || envFound.error) {
    // stop node process
    throw new Error("❌ Couldn't find .env file")
  }
}
