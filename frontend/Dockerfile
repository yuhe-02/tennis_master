# ���Ȩ��(Dockerfile
FROM node:18-alpine

WORKDIR /app

# package.jsonhpackage-lock.json����
COPY package*.json ./

# �X������
RUN npm ci --only=production

# �������n�����ɒ���
COPY . .

# Next.js����������
RUN npm run build

# ���3000�l�
EXPOSE 3000

# �������w�
CMD ["npm", "start"]
