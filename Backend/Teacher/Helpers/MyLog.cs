using NLog;

namespace Teacher.Helpers
{
    public static class MyLog
    {
        public static void Logger(LogMessage typeOfLog, string message)
        {
            var logger = LogManager.GetCurrentClassLogger();
            switch (typeOfLog)
            {
                case LogMessage.Error:
                    logger.Error(message);
                    break;
                case LogMessage.Info:
                    logger.Info(message);
                    break;
            }
        }
    }

    public enum LogMessage
    {
        Info,
        Error
    }
}
