const fs = require('fs');
const path = require('path');
const services = [
  { name: 'course-service', port: 3001 },
  { name: 'enrollment-service', port: 3002 },
  { name: 'billing-service', port: 3003 },
  { name: 'notification-service', port: 3004 },
  { name: 'auth-service', port: 3005 }
];
const outDir = path.join('d:/Projects/Uni Project/student-management-gitops/environments/production/services');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

services.forEach(svc => {
  const yaml = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${svc.name}
  namespace: production
  labels:
    app: ${svc.name}
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ${svc.name}
  template:
    metadata:
      labels:
        app: ${svc.name}
    spec:
      containers:
      - name: ${svc.name}
        image: docker.io/username/${svc.name}:latest
        ports:
        - containerPort: ${svc.port}
        env:
        - name: PORT
          value: "${svc.port}"
        - name: POSTGRES_HOST
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: POSTGRES_HOST
        - name: POSTGRES_PORT
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: POSTGRES_PORT
        - name: POSTGRES_USER
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: POSTGRES_USER
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: POSTGRES_PASSWORD
        - name: POSTGRES_DB
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: POSTGRES_DB
        resources:
          requests:
            cpu: 50m
            memory: 64Mi
          limits:
            cpu: 150m
            memory: 128Mi
---
apiVersion: v1
kind: Service
metadata:
  name: ${svc.name}
  namespace: production
spec:
  selector:
    app: ${svc.name}
  ports:
    - protocol: TCP
      port: 80
      targetPort: ${svc.port}
  type: ClusterIP
`;
  fs.writeFileSync(path.join(outDir, `${svc.name}.yaml`), yaml);
  console.log(`Created ${svc.name}.yaml`);
});
