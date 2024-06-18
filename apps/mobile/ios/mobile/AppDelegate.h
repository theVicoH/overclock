#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import "Orientation.h"

@implementation AppDelegate

@interface AppDelegate : RCTAppDelegate

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

@end
