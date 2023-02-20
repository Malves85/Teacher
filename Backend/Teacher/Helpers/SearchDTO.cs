namespace Teacher.Helpers
{
    public class SearchDTO
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public List<Parameter>? SearchParameters { get; set; }
        public List<Parameter>? SortingParameters { get; set; }

        public void Validate()
        {
            if (PageSize > 100)
            {
                PageSize = 100;
            }

            if (PageSize <= 0)
            {
                PageSize = 1;
            }

            if (CurrentPage <= 0)
            {
                CurrentPage = 1;
            }
        }
    }
}
