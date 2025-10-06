resource "digitalocean_droplet" "hazelcast_poc" {
  name   = var.droplet_name
  region = var.region
  size   = var.droplet_size
  image  = var.droplet_image

  ssh_keys = [var.ssh_key_id]

  tags = ["hazelcast-poc"]

  user_data = file("${path.module}/cloud-init.sh")
}

resource "digitalocean_record" "hazelcast_subdomain" {
  domain = "alexdevvv.com"
  type   = "A"
  name   = "hazelcast"
  value  = digitalocean_droplet.hazelcast_poc.ipv4_address
  ttl    = 60
}

resource "digitalocean_firewall" "hazelcast_fw" {
  name        = "hazelcast-poc-fw"
  droplet_ids = [digitalocean_droplet.hazelcast_poc.id]

  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Salida: permitir todo para facilitar updates y pulls
  outbound_rule {
    protocol              = "tcp"
    port_range            = "0"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "udp"
    port_range            = "0"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}