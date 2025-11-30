import { useEffect } from "react";

const SalesIQWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "zsiqscript";
    script.defer = true;
    script.src = "https://salesiq.zoho.in/widget";

    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = {
      widgetcode: "YOUR_WIDGET_CODE_HERE",
      values: {},
      ready: function () {}
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default SalesIQWidget;
