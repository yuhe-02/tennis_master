# ÕíóÈ¨óÉ(Dockerfile
FROM node:18-alpine

WORKDIR /app

# package.jsonhpackage-lock.json’³Ôü
COPY package*.json ./

# X¢Â’¤ó¹Èüë
RUN npm ci --only=production

# ¢×ê±ü·çón½ü¹³üÉ’³Ôü
COPY . .

# Next.js¢×ê±ü·çó’ÓëÉ
RUN npm run build

# İüÈ3000’l‹
EXPOSE 3000

# ¢×ê±ü·çó’wÕ
CMD ["npm", "start"]
