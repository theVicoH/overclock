data "openstack_networking_subnet_ids_v2" "ext_subnets" {
  network_id = var.network_external_id
}

resource "openstack_networking_floatingip_v2" "floatip_1" {
  pool       = var.network_external_name
  subnet_ids = data.openstack_networking_subnet_ids_v2.ext_subnets.ids
}

resource "openstack_compute_instance_v2" "proxy_instance" {
  name        = "proxy_instance"
  image_id    = var.instance_image_id
  flavor_name = var.instance_flavor_name
  metadata    = var.metadatas
  security_groups = [
    openstack_networking_secgroup_v2.proxy.name,
    openstack_networking_secgroup_v2.ssh.name,
    "default"
  ]
  key_pair = openstack_compute_keypair_v2.ssh_public_key.name
  network {
    name = var.network_internal_dev
  }

  depends_on = [
    openstack_networking_subnet_v2.network_subnet,
    openstack_networking_secgroup_rule_v2.ssh_rule_external,
    openstack_networking_secgroup_rule_v2.ssh_rule_internal,
    openstack_networking_secgroup_rule_v2.proxy_http_rule,
    openstack_networking_secgroup_rule_v2.proxy_https_rule,
    openstack_networking_secgroup_rule_v2.rabbitmq_management_rule,
    openstack_networking_secgroup_rule_v2.rabbitmq_rule,
    openstack_networking_secgroup_rule_v2.rabbitmq_secure_rule,
    openstack_networking_secgroup_rule_v2.proxy_management_rule,
  ]
}

resource "openstack_compute_floatingip_associate_v2" "fip_assoc" {
  floating_ip = openstack_networking_floatingip_v2.floatip_1.address
  instance_id = openstack_compute_instance_v2.proxy_instance.id
}
