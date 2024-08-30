using AutoMapper;
using System.Text.RegularExpressions;

namespace electro.api.rest.Mapper
{
    public class BytesToBase64Converter : ITypeConverter<byte[], string>
    {
        public string Convert(byte[] source, string destination, ResolutionContext context)
        {
            if (source == null || source.Length == 0)
            {
                return null;
            }
            return "data:image/jpeg;charset=utf-8;base64," + System.Convert.ToBase64String(source);
        }
    }

    public class Base64ToBytesConverter : ITypeConverter<string, byte[]>
    {
        public byte[] Convert(string source, byte[] destination, ResolutionContext context)
        {
            if (string.IsNullOrEmpty(source))
            {
                return null;
            }
            return System.Convert.FromBase64String(Regex.Replace(source, "^data:(.*,)?", ""));
        }
    }

    public class ListOfBytesToListOfBase64Converter : ITypeConverter<List<byte[]>, List<string>>
    {
        public List<string> Convert(List<byte[]> source, List<string> destination, ResolutionContext context)
        {
            if (source == null)
            {
                return null;
            }
            var converter = new BytesToBase64Converter();
            return source.Select(photoBytes => converter.Convert(photoBytes, null, context)).ToList();
        }
    }

    public class ListOfBase64ToListOfBytesConverter : ITypeConverter<List<string>, List<byte[]>>
    {
        public List<byte[]> Convert(List<string> source, List<byte[]> destination, ResolutionContext context)
        {
            if (source == null)
            {
                return null;
            }
            var converter = new Base64ToBytesConverter();
            return source.Select(photoBase64 => converter.Convert(photoBase64, null, context)).ToList();
        }
    }
}