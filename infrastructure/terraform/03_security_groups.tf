resource "openstack_networking_secgroup_v2" "ssh" {
  name        = "ssh"
  description = "SSH access (external and internal)"
}

resource "openstack_networking_secgroup_rule_v2" "ssh_rule_external" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 22
  port_range_max    = 22
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.ssh.id
}

resource "openstack_networking_secgroup_rule_v2" "ssh_rule_internal" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 22
  port_range_max    = 22
  remote_ip_prefix  = var.network_subnet_cidr
  security_group_id = openstack_networking_secgroup_v2.ssh.id
}

resource "openstack_networking_secgroup_v2" "proxy" {
  name        = "proxy"
  description = "Proxy access"
}

resource "openstack_networking_secgroup_rule_v2" "proxy_http_rule" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 80
  port_range_max    = 80
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.proxy.id
}

resource "openstack_networking_secgroup_rule_v2" "proxy_https_rule" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 443
  port_range_max    = 443
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.proxy.id
}

resource "openstack_networking_secgroup_v2" "all_internal" {
  name        = "all_internal"
  description = "All internal traffic"
}

resource "openstack_networking_secgroup_rule_v2" "rabbitmq_management_rule" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 15672
  port_range_max    = 15672
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.proxy.id
}

resource "openstack_networking_secgroup_rule_v2" "rabbitmq_rule" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 1883
  port_range_max    = 1883
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.proxy.id
}

resource "openstack_networking_secgroup_rule_v2" "rabbitmq_secure_rule" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 8883
  port_range_max    = 8883
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.proxy.id
}

resource "openstack_networking_secgroup_rule_v2" "proxy_management_rule" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 81
  port_range_max    = 81
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.proxy.id
}


resource "openstack_networking_secgroup_rule_v2" "all_internal_rule_tcp" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 1
  port_range_max    = 65535
  remote_ip_prefix  = var.network_subnet_cidr
  security_group_id = openstack_networking_secgroup_v2.all_internal.id
}

resource "openstack_networking_secgroup_rule_v2" "all_internal_rule_udp" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "udp"
  port_range_min    = 1
  port_range_max    = 65535
  remote_ip_prefix  = var.network_subnet_cidr
  security_group_id = openstack_networking_secgroup_v2.all_internal.id
}
