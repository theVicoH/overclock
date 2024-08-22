# ESP32 Car Project Setup

This README provides detailed instructions for setting up the ESP32 project, including environment configuration and code deployment.

## Prerequisites

- [Visual Studio Code (VSCode)](https://code.visualstudio.com/)
- [PlatformIO IDE extension for VSCode]
- ESP32 development board
- USB cable for connecting ESP32 to your computer

## Getting Started

### 1. Open the Project in VSCode

1. Clone the project repository or download the project files.
2. Open the project in VSCode by navigating to the `esp32` directory.

### 2. Install PlatformIO Extension

1. Open VSCode.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
3. Search for `PlatformIO IDE` and install it.

### 3. Create and Configure the `.env` File

1. Navigate to the `data` folder inside your project directory.
2. Create a new file named `.env`.
3. Use the `.env.example` file as a reference for your `.env` configuration. Copy its contents and adjust the values accordingly.

#### Filling Out the `.env` File

- **Gateway IP**: Run `ipconfig` in your command prompt (CMD) and find the "Default Gateway (Passerelle par défaut)" under the Wireless LAN adapter Wi-Fi section. This value should be entered for the `GATEWAY` variable in your `.env` file.
- **Subnet Mask**: Use the subnet mask value provided under the same section in `ipconfig`. Enter this value for the `SUBNET_MASK` variable.
- **Local IP**: Set this value by using the same IP as the `GATEWAY` but change the last digit to `50`. For example, if your gateway IP is `192.168.1.1`, set the `LOCAL_IP` to `192.168.1.50`.

### 4. Upload the Environment Configuration

1. Open the PlatformIO terminal at the bottom of the VSCode window.
2. Run the following command to upload the `.env` file to the ESP32: "platformio run --target uploadfs"
3. Build the code by clicking on Platform Build at the bottom of your VSCode window.
4. Upload the code to the ESP32 by clicking on Platform Upload at the bottom of your VSCode window.