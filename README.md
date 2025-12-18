# TimestampYT

TimestampYT is a lightweight Chrome extension that allows users to save important timestamps from YouTube videos for later reference. It is designed to help users quickly mark key moments while watching videos without interrupting playback.

## Overview

TimestampYT provides a simple popup interface where users can save the current timestamp of a YouTube video along with an optional note. Saved timestamps make it easy to return to important moments such as explanations tutorials or highlights.

All saved timestamps are stored locally using Chrome storage and remain available across browser sessions.

## Features

Save timestamps from the currently playing YouTube video  
Add optional notes to saved timestamps  
Quick access to saved timestamps from the popup  
Automatically persists saved data across sessions  
Clean and minimal user interface

## Tech Stack

TypeScript  
React  
Vite  
Tailwind CSS  
Chrome Extensions Manifest V3

## How It Works

When the user opens a YouTube video and clicks the extension the current playback time is captured using the active tab. The timestamp along with any optional note is stored using Chrome storage.

Selecting a saved timestamp navigates the video back to the exact saved time. All functionality runs locally in the browser and no external services are used.

## Installation for Development

Clone the repository

git clone https://github.com/Shashwat-06/TimestampYT-Chrome-Extension

Install dependencies

npm install

Build the extension

npm run build

Load the extension in Chrome

Open chrome://extensions  
Enable Developer Mode  
Click Load unpacked  
Select the dist folder

## Usage

Open a YouTube video  
Click the YouTube Timestamp Saver extension icon  
Save the current timestamp optionally with a note  
Click any saved timestamp to jump back to that moment

## Permissions Used

activeTab is used to access the currently active YouTube tab after a user action  
storage is used to save and retrieve timestamps locally

## Privacy

YouTube Timestamp Saver does not collect store or transmit any personal data. All timestamps and notes are saved locally in the browser and are never sent to any external server.

## License

This project is open source and available under the MIT License.
