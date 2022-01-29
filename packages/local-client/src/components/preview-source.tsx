export const previewSource = `<html>
  <head>
    <style>
      html {
        background-color: #fff;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      function tryParseJSON(jsonString){
        try { return JSON.parse(jsonString); }
        catch(error){ return {}; }
      }
      
      function handleError(error){
        const [type, ...message] = error.replace("Uncaught ", "").split(":");

        const root = document.getElementById("root");
        root.innerHTML = '<div style="color: red;"><h4>' + type + ':</h4>' + message.join(":") + '</div>';
      }

      const handlers = {
        execute_code: eval,
        bundle_error: handleError
      }

      window.addEventListener("message", (event) => {
        const {type, data} = tryParseJSON(event.data);
        handlers[type]?.(data);
      });

      window.addEventListener("error", (event) => handleError(event.message));
    </script>
  </body>
</html>`;
