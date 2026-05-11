#include "rclcpp/rclcpp.hpp"

int main(int argc, char **argv)
{
  rclcpp::init(argc, argv);
  auto node = rclcpp::Node::make_shared("hello_five_meat");
  
  RCLCPP_INFO(node->get_logger(), "哈喽，五花肉");
  
  rclcpp::spin_some(node);
  rclcpp::shutdown();
  
  return 0;
}
