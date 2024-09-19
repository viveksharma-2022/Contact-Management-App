using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Collections.Generic;
using Contacts_Management_App_Api.Model;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Contacts_Management_App_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly Repository _repository;
        public ContactsController(Repository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllContacts()
        {
            var contacts = await _repository.GetAllContactsAsync();
            return Ok(contacts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetContactById(int id)
        {
            var contact = await _repository.GetContactsByIdAsync(id);
            if (contact == null)
            {
                return NotFound();
            }
            return Ok(contact);
        }

        [HttpPost]
        public async Task<ActionResult> AddContact([FromBody] Users contact)
        {
            if (contact == null)
            {
                return BadRequest("Contact is null");
            }

            await _repository.AddContactAsync(contact);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateContacts(int id, [FromBody] Users contact)
        {
            await _repository.UpdateContactAsync(id, contact);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteContact(int id)
        {
            await _repository.DeleteContactAsync(id);
            return Ok();
        }
    }
}
