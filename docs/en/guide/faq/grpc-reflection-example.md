---
title: Registering a gRPC Reflection Service
permalink: /pages/grpc-reflection-example/
---
gRPC reflection is a cross-language feature that allows clients to query the services and methods supported by a server at runtime. This lets clients discover the RPC services available on the server without knowing their detailed definitions in advance. The gRPC reflection service is part of the gRPC specification, so it is available in every programming language that supports gRPC.

The way a gRPC reflection service is registered may differ between languages, but the concept is the same. Below are examples of registering a gRPC reflection service in some common programming languages:

### Go

In Go, you can register the reflection service using the `google.golang.org/grpc/reflection` package:

```go
import (
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	s := grpc.NewServer()
	// Register your service
	myService := &myService{}
	pb.RegisterMyServiceServer(s, myService)

	// Register the gRPC reflection service
	reflection.Register(s)

	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
```

### Java

In Java, you can register the reflection service using `ServerReflectionProvider` from the `io.grpc` package:

```java
import io.grpc.Server;
import io.grpc.ServerBuilder;
import io.grpc.ServerReflection;
import io.grpc.ServerReflectionProvider;

Server server = ServerBuilder.forPort(50051)
    .addService(new MyService())
    .addService(ServerReflectionProvider.build())
    .build()
    .start();
```

### Python

In Python, you can register the reflection service using the `grpcio` and `grpcio_reflection` packages:

```python
from concurrent import futures
import grpc
import helloworld_pb2
import helloworld_pb2_grpc

class Greeter(helloworld_pb2_grpc.GreeterServicer):

    def SayHello(self, request, context):
        return helloworld_pb2.HelloReply(message='Hello, %s!' % request.name)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    helloworld_pb2_grpc.add_GreeterServicer_to_server(Greeter(), server)
    grpc_reflection.enable_server_reflection(server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
```

### C#

In C#, you can register the reflection service using the `ServerReflection` class from the `Grpc.Reflection` namespace:

```csharp
using Grpc.Core;
using Grpc.Reflection;
using System;
using System.Threading.Tasks;

public class MyService : MyService.MyServiceBase
{
    public override Task<Reply> SayHello(HelloRequest request, ServerCallContext context)
    {
        return Task.FromResult(new Reply { Message = "Hello " + request.Name });
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        var server = new Server()
        {
            Services = { MyService.BindService(new MyService()), ServerReflection.DescriptorServer },
            Ports = { { "localhost", 50051, ServerCredentials.Insecure } }
        };
        server.Start();
        Console.WriteLine("Server started.");
        Console.WriteLine("Press any key to stop the server...");
        Console.ReadKey();
        server.ShutdownAsync().Wait();
    }
}
```

In all of these examples, the purpose of registering the reflection service is to allow clients to query the services and methods available on the server through the gRPC reflection API. This is useful when writing clients that need dynamic service discovery—for example, when building a generic gRPC client or proxy.
