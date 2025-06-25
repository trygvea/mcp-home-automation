# Very simple MCP server to access a fake Home Automation system

This server is just for MCP demonstration, and is NOT backed by a real Home Automation system. 

## Setup
Your AI application will start up the MCP server for you, but you will need to configure it to do so.

### Claude client

You can set the MCP config from settings->developer->Edit config.

```json
{
    "mcpServers": {
        "mcp-home-automation": {
            "command": "npx",
            "args": [
                "-y",
                "~/prj/2025/mcp-home-automation" // Using local path while developing
            ],
            "env": {
              // You might need something like this for a real home automation system
              "HOME_AUTOMATION_TOKEN": YOUR_HOME_AUTOMATION_TOKEN 
            }
        }
    }
}
```

### VS Code plugin
You find the MCP config under "mcp.servers" in VS Code settings. Add the following:

```json
{
    "mcp": {
        "inputs": [],
        "servers": {
            "mcp-home-automation": {
                "command": "npx",
                "args": [
                    "-y",
                    "~/prj/2025/mcp-home-automation"
                ]
            }        
        }
    }
}
```

### ChatGPT
ChatGPT has announced some MCP compatibility, but currently hides this behind its "Connectors" feature, unless you have Educational or Enterprise access. If you have access, you can set up a connector to your MCP Home Automation server.

### Gemini
Gemini has announced some MCP compatibility, but currently there are no way of configuring your opwn MCP servers.  

### Starting the MCP server
There are many ways to start a node application, but MCP frequently uses `npx <folder>` to start the MCP server. For your info, this has been accomplished by marking the entrypoint as executable using:
* src/index.ts:1: Tagged as an executable with `#!/usr/bin/env node`
* package.json: Contains a `bin` entry pointing to the executable
* package.json: marks the dist/index.js as an executable with `chmod +x` during build
