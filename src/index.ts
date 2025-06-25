#!/usr/bin/env node
// Makes this file executable with the `npx .` command.
// Also, package.json must set the "bin" entry and make us executable during build (chmod +x).

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod"; // simplify JSON Schema generation and validation
import {dimUp, getLampStatus} from "./tool/homeAutomationTool.js"

// Create an MCP server and add home automation tools

const server = new McpServer({
    name: "home-automation",
    version: "1.0.0",
    capabilities: {
        tools: {listChanged: true}
    }
});

server.registerTool("getLampStatus",
    {
        title: "Get Lamp Status",
        description: "Get current status of all lamps in a room",
        inputSchema: {
            room: z.string().describe("Room name")
        },
    },
    async ({ room }) => ({
        content: [{type: "text", text: JSON.stringify(getLampStatus(room))}]
    })
);

server.registerTool("dimUp",
    {
        title: "Dim up all lamps in a room",
        description: "Dim up all dimmable lamps in a room by a specified increment",
        inputSchema: {
            room: z.string().describe("Room name"),
            increment: z.number().int().min(1).max(100).describe("Increment value to dim up")
        },
    },
    async ({ room, increment }) => {
        dimUp(room, increment)
        return {
            content: [{type: "text", text: "ok"}]
        }
    }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);

console.error("Home Automation MCP Server running on stdio"); // NOTE: cannot use stdout for logging, as it is used for communication with the client
