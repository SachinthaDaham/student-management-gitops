# StudentOS: Cloud-Native Management Platform

<img width="2816" height="1536" alt="Gemini_Generated_Image_ieb6u7ieb6u7ieb6" src="https://github.com/user-attachments/assets/248f536e-020b-4ca7-8577-ef932a22d8a6" />


## 🚀 Project Overview

StudentOS is a highly resilient, auto-scaling microservices platform built to manage complex student data systems. Engineered with modern Cloud-Native principles, this project completely eliminates manual deployments through a fully automated, zero-downtime **GitOps** pipeline. 

The infrastructure is declaratively provisioned on AWS using **Terraform**, while the application workloads are containerized with **Docker** and orchestrated on **Amazon EKS**. The platform is secured by an **Istio Service Mesh** and boasts a comprehensive observability stack for real-time monitoring and tracing.

## ✨ Key Features

### 🔄 1. 100% Automated GitOps Pipeline
Deployments are entirely hands-off. **Concourse CI** handles the continuous integration and image building, while **ArgoCD** continuously monitors the Git repository to synchronize the desired state into the EKS cluster. 
<img width="1536" height="787" alt="Screenshot 2026-07-12 220511" src="https://github.com/user-attachments/assets/47f0d03e-2166-4a50-9518-458ac13dfd38" />
<img width="1313" height="698" alt="Screenshot 2026-07-12 220614" src="https://github.com/user-attachments/assets/d5194538-37b3-49ca-b37f-1d5db4dae74f" />



### 📈 2. Event-Driven Autoscaling
Standard CPU/Memory scaling isn't enough for modern apps. This platform utilizes **KEDA (Kubernetes Event-driven Autoscaling)** to scale workloads proactively based on custom metrics and queue lengths, ensuring the system can handle traffic spikes without wasting resources during downtime.
<img width="1527" height="765" alt="image" src="https://github.com/user-attachments/assets/03b13568-21d0-4538-b825-4d9d171e782e" />


### 🔒 3. Enterprise-Grade Security
Security is baked into the platform at every layer. 
* **Trivy** continuously scans containers for vulnerabilities.
* **Istio Service Mesh** enforces strict mTLS (mutual TLS) encryption between all internal microservices.
* **AWS External Secrets Operator** maps AWS Secrets Manager directly into the cluster using IRSA (IAM Roles for Service Accounts), preventing hardcoded credentials.

### 📊 4. Deep Observability
Troubleshooting microservices requires deep visibility. The platform uses the **kube-prometheus-stack** to aggregate cluster metrics, **Loki & Promtail** for centralized log aggregation, and **Jaeger (OpenTelemetry)** for distributed request tracing across the mesh.
<img width="1528" height="769" alt="image" src="https://github.com/user-attachments/assets/9a042bbf-f4fa-451d-b820-5af420c7330b" />
<img width="1530" height="675" alt="image" src="https://github.com/user-attachments/assets/c153c935-710a-459e-ba4f-4246c1c385d7" />
<img width="1535" height="589" alt="image" src="https://github.com/user-attachments/assets/4743559b-928e-47b0-ba2c-d41361ad6307" />
<img width="1532" height="777" alt="image" src="https://github.com/user-attachments/assets/007429ac-75ed-4466-92e8-7d2f71ee9942" />

☁️ 5. Cloud-Native AWS Infrastructure
The entire foundation of the platform is built on AWS using Terraform for reproducible Infrastructure-as-Code (IaC).

Managed Kubernetes: The core workloads run on Amazon EKS, utilizing managed node groups for simplified patching and upgrades.
Persistent Storage & Data: Stateful applications rely on Amazon RDS for managed PostgreSQL databases and AWS EBS (Elastic Block Store) dynamically provisioned via the EBS CSI Driver for persistent container storage.
Least-Privilege Security: Instead of passing static AWS access keys, the platform utilizes AWS IRSA (IAM Roles for Service Accounts). This allows Kubernetes pods (like the External Secrets Operator and EBS CSI driver) to securely authenticate with AWS services like AWS Secrets Manager and EC2 using temporary, short-lived tokens, strictly enforcing the principle of least privilege.

<img width="1536" height="633" alt="image" src="https://github.com/user-attachments/assets/58ab6118-1e16-4d24-a0e9-c14583f61114" />
<img width="1524" height="586" alt="image" src="https://github.com/user-attachments/assets/6fd7d308-1f42-4f01-8c03-309a37d90c8b" />
<img width="1188" height="541" alt="image" src="https://github.com/user-attachments/assets/44370226-ff32-40dd-82ee-cb3245d561bc" />


## 🛠️ Technology Stack

* **Cloud Provider:** AWS (EKS, RDS PostgreSQL, EBS, Secrets Manager)
* **Infrastructure as Code (IaC):** Terraform, Helm
* **Containerization & Orchestration:** Kubernetes, Docker
* **CI/CD & GitOps:** ArgoCD, Concourse CI, GitHub
* **Service Mesh & Networking:** Istio, NGINX Ingress, cert-manager
* **Security & Secrets:** Trivy, External Secrets Operator, AWS IRSA
* **Autoscaling:** KEDA, Kubernetes Cluster Autoscaler
* **Observability:** Prometheus, Grafana, Jaeger, OpenTelemetry, Loki, Promtail
* **Application Layer:** Node.js, PostgreSQL, Redis, Selenium (Automated Reporting)

***
