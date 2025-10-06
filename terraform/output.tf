output "droplet_ip" {
  description = "Public IPv4 of the droplet"
  value       = digitalocean_droplet.hazelcast_poc.ipv4_address
}

output "site_fqdn" {
  description = "FQDN for the web app"
  value       = "hazelcast.alexdevvv.com"
}
