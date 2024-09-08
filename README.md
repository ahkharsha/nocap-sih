# UIDAI Bot Detection Portal 🚀

## Overview 🌐

Welcome to the UIDAI Bot Detection Portal! This project provides a secure interface for UIDAI (Unique Identification Authority of India) services, incorporating various bot detection methods using environmental parameters and user behavior analysis. Our goal is to ensure safe and human-only interactions by passively collecting and analyzing data.

## Live Demo 🌟

Explore the live demo here: [UIDAI Bot Detection Portal](https://nocap-sih.vercel.app/)

## Features ✨

- **Mouse Movement Analysis** 🖱️: Tracks and analyzes mouse movements to identify bot-like behavior based on consistency, speed, and direction changes.
- **Typing Pattern Analysis** ⌨️: Monitors typing patterns, including speed, interval variations, and key diversity to detect bots.
- **User Behavior Analysis** 👤: Observes scroll and click behavior to spot inconsistencies in human interactions.
- **Time on Page Detection** ⏱️: Measures the time spent on the page to identify suspiciously fast or excessively long interactions.
- **Browser Fingerprinting** 🕵️‍♂️: Collects browser-specific data (e.g., user agent, screen resolution) to create a unique fingerprint of the user.
- **Network Behavior Analysis** 🌐: Analyzes the frequency and timing of network requests to detect abnormal patterns.

## Installation 💻

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/uidai-bot-detection-portal.git
    ```

2. **Navigate into the directory**:
    ```bash
    cd uidai-bot-detection-portal
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Run the app**:
    ```bash
    npm start
    ```

## Usage 🛠️

1. **Interact with the Portal**: Begin by interacting with the portal to allow data collection.
2. **Data Collection**: The system will passively collect and analyze data based on your mouse movements, typing patterns, and behavior.
3. **Detection Statuses**: View the bot detection statuses for various methods directly in the UI.

## Tech Stack 💻

- **Frontend**: React ⚛️
- **Authentication**: Google Firebase Authentication 🔒
- **Bot Detection**: Custom algorithms for behavior analysis and fingerprinting 🧠
- **Backend**: AI/ML processing (coming soon) 🤖

## Future Improvements 🚀

- Integration with backend AI/ML for advanced pattern analysis.
- Real-time bot detection enhancements.
- UI/UX improvements and responsive design updates.

## License 📜

This project is licensed under the MIT License - see the [LICENSE](https://github.com/ahkharsha/nocap-sih/blob/main/LICENSE) file for details.

## Contact 📧

For any questions or issues, please reach out to [Harsha Kumar](mailto:ahkharsha@gmail.com).
