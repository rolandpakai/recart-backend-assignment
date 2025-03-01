const getMongoUrl = () => {
  const url = process.env.MONGO_URL;

  if (!url) {
    throw new Error("MONGO_URL environment variable is missing");
  }

  return url;
};

export default getMongoUrl;
