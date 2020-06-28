import crypto from "crypto";

export default {
  createHash(message) {
    const hash = crypto.createHash("md5").update(message).digest("hex");
    return hash;
  },
};
