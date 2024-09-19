using System.Text.Json;

namespace Contacts_Management_App_Api.Model
{
    public class Repository
    {
      
        private readonly string _jsonFilePath;

        public Repository(IWebHostEnvironment webHostEnvironment)
        {
            _jsonFilePath = Path.Combine(webHostEnvironment.WebRootPath, "users.json");
        }



        public async Task<List<Users>> GetAllContactsAsync()
        {
            if (!File.Exists(_jsonFilePath))
            {
                return new List<Users>();
            }

            var json = await File.ReadAllTextAsync(_jsonFilePath);
            return JsonSerializer.Deserialize<List<Users>>(json);
        }
        public async Task<Users> GetContactsByIdAsync(int id)
        {
            var contacts = await GetAllContactsAsync();
            return contacts.FirstOrDefault(c => c.Id == id);
        }
        public async Task AddContactAsync(Users contact)
        {
            var contacts = await GetAllContactsAsync();
            contact.Id = contacts.Any() ? contacts.Max(e => e.Id) + 1 : 1;
            contacts.Add(contact);
            await SaveContactsAsync(contacts);
        }
        private async Task SaveContactsAsync(List<Users> contacts)
        {
            var json = JsonSerializer.Serialize(contacts, new JsonSerializerOptions { WriteIndented = true });

            try
            {
                await File.WriteAllTextAsync(_jsonFilePath, json);
                Console.WriteLine("Contacts saved successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving Contacts: {ex.Message}");
                throw;
            }
        }

        public async Task UpdateContactAsync(int id, Users updatedContact)
        {
            var contacts = await GetAllContactsAsync();
            var cI = contacts.FindIndex(e => e.Id == id);
            if (cI == -1)
            {
                throw new Exception("Contact not found");
            }
            updatedContact.Id = id;
            contacts[cI] = updatedContact;
            await SaveContactsAsync(contacts);
        }
        public async Task DeleteContactAsync(int id)
        {
            var contacts = await GetAllContactsAsync();
            var contact = contacts.FirstOrDefault(e => e.Id == id);
            if (contact == null)
            {
                throw new Exception("Contacts not found");
            }
            contacts.Remove(contact);
            await SaveContactsAsync(contacts);
        }
    }
}
