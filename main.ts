import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "weather-mcp-server",
  version: "1.0.0",
});

server.registerTool(
  "fetch-weather",
  {
    title: "Weather Fetcher",
    description: "Get weather data for a city",
    inputSchema: { city: z.string() },
  },
  async ({ city }) => {
    const data = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search/?name=${city}`
    );
    if (data.status !== 200) {
      throw new Error(`Failed to fetch coordinates for city: ${city}`);
    }
    const geoJson = await data.json();
    const { longitude, latitude } = geoJson.results[0];

    const response2 = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    if (response2.status !== 200) {
      throw new Error(`Failed to fetch weather data for city: ${city}`);
    }
    const weatherData = await response2.json();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(weatherData, null, 2),
        },
      ],
    };
  }
);

server.registerTool(
  "list-projects",
  {
    title: "List Projects",
    description: "Lists all available projects",
    inputSchema: {},
  },
  async () => {
    return {
      content: [
        {
          type: "text",
          text: `Available projects: ${JSON.stringify(projects, null, 2)}`,
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
server.connect(transport);
