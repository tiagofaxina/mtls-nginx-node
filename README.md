<h1 align="center">
  Project to test mTLS
</h1>

## Requirements

- [Docker](https://www.docker.com/get-started) (Windows)
- [Docker Compose](https://docs.docker.com/compose/install/) (Linux)

## Instalação

1.  **Clone the repository.**

    ```bash
    $ git clone https://github.com/tiagofaxina/mtls-nginx-node.git
    ```

2.  **Access project folder.**
    ```bash
    $ cd mtls-nginx-node
    ```

3.  **Generate certificates**
    - Create and access "certs" folder
    ```bash
    $ mkdir certs
    ```
    ```bash
    $ cd certs
    ```

    - Create global.pass file
    $ touch global.pass

    - Generate certificates
    ```bash
    $ openssl req -newkey rsa:4096 -x509 -keyout ca.key -out ca.crt -days 30 -nodes -subj "//CN=my_ca"
    ```
    ```bash
    $ openssl req -newkey rsa:4096 -keyout server.key -out server.csr -nodes -days 30 -subj "//CN=localhost"
    ```
    ```bash
    $ openssl x509 -req -in server.csr -out server.crt -CA ca.crt -CAkey ca.key -CAcreateserial -days 30
    ```
    ```bash
    $ openssl req -newkey rsa:4096 -keyout client.key -out client.csr -nodes -days 30 -subj "//CN=client"
    ```
    ```bash
    openssl x509  -req -in client.csr -out client.crt -CA ca.crt -CAkey ca.key -CAcreateserial -days 30
    ```

4.  **Installation**

  - Image build
    ```bash
    $ docker-compose build
    ```
  - Container init
    ```bash
    $ docker-compose up -d
    ```
5. **Usage**
  - Now you can run the command below and test
    ```bash
    $ curl https://localhost --cacert certs/ca.crt --key certs/client.key --cert certs/client.crt
    ```
