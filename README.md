# MZD Connect Tool

## Overview

This project provides a debugging and utility toolkit for the Mazda Connect infotainment system (MZD Connect). It creates an overlay interface that allows developers and enthusiasts to perform various system operations directly from the head unit.

## Features

- **Interactive Terminal Access**: Opens the vehicle diagnostics terminal
- **UI Log Viewer**: Captures and displays system logs directly on the interface
- **Region Settings**: Ability to change the UI region settings (e.g., to Europe)
- **System Control**: Options to restart the CMU (Connectivity Master Unit)
- **Clean Interface**: Collapsible overlay that doesn't interfere with normal operations

## File Structure

```
├── dev.html           # Development test page
├── mp3title.txt       # XSS entry point for injection via MP3 title
├── css/
│   └── init.css       # Styling for the overlay interface
├── js/
│   └── run.js         # Main JavaScript functionality
└── mp3/
    ├── a.mp3          # Sample MP3 files for deployment
    ├── b.mp3
    ├── c.mp3
    └── d.mp3
```


## Installation

1. Copy all files to a USB drive
2. Insert the USB drive into the vehicle's USB port
3. Play any of the MP3 files from the USB drive
4. The toolkit interface will appear on the screen

## Usage

Once the overlay is loaded, you can:
- Click on "Open terminal" to access system diagnostics
- Enable "UI logs" to see system messages
- Set the region to Europe with "Set UI region: EU"
- Restart the system with "Restart"
- Remove the overlay with "Destroy"
- Toggle the visibility of the panel using the small button at the bottom

## Development

For development purposes:
- Use `dev.html` to test the interface in a browser
- The code detects whether it's running in development or on the actual infotainment system

## Disclaimer

This tool is for educational and development purposes only. Use at your own risk. Modifying your vehicle's infotainment system may void warranties and could potentially cause system issues.
