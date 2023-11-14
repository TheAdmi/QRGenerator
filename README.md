# QR Code Generator

QR Code Generator is a web application that allows users to generate QR codes for URLs, text, phone numbers, and emails. It provides a simple and user-friendly interface with the ability to customize the QR code theme and download it in various formats.

## Features

- Generate QR codes for URLs, text, phone numbers, and emails.
- Choose from different color themes for the page background.
- Download QR codes in PNG, SVG, and JPG formats.
- Dark mode support using the theme switcher in the Navbar.

## Technologies Used

- **Backend**: Django, Django Rest Framework
- **Frontend**: React.js, Tailwind CSS
- **Theme Switcher**: Mode Theme Switcher
- **QR Code Generation**: qrcode library (Python), aspose.words (Python)
- **Download Button**: html-to-image, FileSaver

## Responsive Design

Our website is designed to be fully responsive, ensuring a great user experience across a wide range of devices. Below are video demonstrations for both large screens (PC and tablet) and mobile screens to showcase how the website adapts to different screen sizes:

### Large Screens (PC and Tablet)

![QRGenerator - pc screen](QRGenerator(pc).gif)

*Click to play the video.*

### Mobile Screens

QRGenerator(mobile).gif
![QRGenerator - mobile screen](QRGenerator(mobile).gif)

*Click to play the video.*

We are committed to providing an optimal user experience for all visitors, regardless of the device they are using.

# Setup

Clone the repository:

```bash
git clone https://github.com/TheAdmi/QRGenerator.git
```

Navigate to the project directory:

```bash
cd QRGenerator
```

### Backend (Django)

Navigate to the Django folder:

```bash
cd Django(backend)
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment:

- On Windows:

```bash
venv\Scripts\activate
```

- On macOS/Linux:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the Django development server:

```bash
python manage.py runserver
```

The Django backend will be accessible at [http://localhost:8000/](http://localhost:8000/).

### Frontend (ReactJs)

Navigate to the ReactJs folder:

```bash
cd ReactJs(frontend)
```

Install dependencies:

```bash
npm install
```

Run the React development server:

```bash
npm start
```

The React frontend will be accessible at [http://localhost:2000/](http://localhost:2000/).

## Usage

1. Open the application in your browser.

2. Use the input field to enter the URL, text, phone number, or email for which you want to generate a QR code.

3. Select the desired color theme from the options on the left.

4. Click the "Generate" button to create the QR code.

5. Download the QR code in PNG, SVG, or JPG format using the corresponding buttons below the QR code.

6. Toggle between light and dark mode using the theme switcher in the Navbar.
